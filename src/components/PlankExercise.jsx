import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { thresholdsBeginner, thresholdsPro } from './PlankThresholds';
import { useNavigate } from 'react-router-dom';
import { startSession, updateSession, endSession } from '../api';
import { debounce } from 'lodash';


function PlankExercise() {

    //webcam and canvas references
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionEnded, setSessionEnded] = useState(false);


    const startTime = useRef(Date.now());

    // Mode: beginner or pro
    const [isBeginnerMode, setIsBeginnerMode] = useState(true); // Default to beginner mode
    const [currentThresholds, setCurrentThresholds] = useState(thresholdsBeginner);

    const flipFrameRef = useRef(false);

    // State tracker for the pose analysis
    const correctTime = useRef(0);
    const incorrectTime = useRef(0);
    const feedbackCounts = useRef([0, 0, 0, 0, 0, 0]); // Array for feedback counts

    const colors = {
        white: "#FFFFFF",
        yellow: "#FFFF00",
        magenta: "#FF00FF",
        // Add more colors as needed
    };

    // dict Features for the pose landmarks
    const dictFeatures = {
        left: {
            ear: 7,
            shoulder: 11,
            elbow: 13,
            wrist: 15,
            hip: 23,
            knee: 25,
            ankle: 27,
            foot: 31,
        },
        right: {
            ear: 8,
            shoulder: 12,
            elbow: 14,
            wrist: 16,
            hip: 24,
            knee: 26,
            ankle: 28,
            foot: 32,
        },
        nose: 0,
    };

    const FEEDBACK = {
        lowerHead: "Lower Your Head",
        raiseHead: "Raise Your Head",
        lowerHips: "Lower Your Hips",
        raiseHips: "Raise Your Hips",
        feetVertical: "Keep Feet Vertical",
        shouldersVertical: "Keep Shoulders Vertical",
    };

    /*
      Start Utility functions for drawing text angle calculations and landmark features
    */

    // Utility function to convert normalized landmark position to canvas coordinates

    const getLandmarkPosition = (landmark, frameWidth, frameHeight) => {
        return {
            x: landmark.x * frameWidth,
            y: landmark.y * frameHeight
        };
    };

    // Main function to extract specific landmark features
    const getLandmarkFeatures = (poseLandmarks, feature, frameWidth, frameHeight) => {
        if (feature === 'nose') {
            return getLandmarkPosition(poseLandmarks[dictFeatures.nose], frameWidth, frameHeight);
        } else if (feature === 'left' || feature === 'right') {
            const featureSet = dictFeatures[feature];
            return {
                shoulder: getLandmarkPosition(poseLandmarks[featureSet.shoulder], frameWidth, frameHeight),
                elbow: getLandmarkPosition(poseLandmarks[featureSet.elbow], frameWidth, frameHeight),
                wrist: getLandmarkPosition(poseLandmarks[featureSet.wrist], frameWidth, frameHeight),
                hip: getLandmarkPosition(poseLandmarks[featureSet.hip], frameWidth, frameHeight),
                knee: getLandmarkPosition(poseLandmarks[featureSet.knee], frameWidth, frameHeight),
                ankle: getLandmarkPosition(poseLandmarks[featureSet.ankle], frameWidth, frameHeight),
                foot: getLandmarkPosition(poseLandmarks[featureSet.foot], frameWidth, frameHeight),
                ear: getLandmarkPosition(poseLandmarks[featureSet.ear], frameWidth, frameHeight) // Adding the ear landmark
            };
        } else {
            throw new Error("Feature must be 'nose', 'left', or 'right'.");
        }
    };

    // Helper function to calculate the dot product of two vectors
    const dot = (v1, v2) => {
        return v1.x * v2.x + v1.y * v2.y;
    };

    // Helper function to calculate the magnitude (length) of a vector
    const magnitude = (v) => {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };

    // Function to calculate the angle between two points, optionally relative to a reference point
    const findAngle = (p1, p2, refPt = { x: 0, y: 0 }) => {
        // Translate points by reference point
        const p1Ref = { x: p1.x - refPt.x, y: p1.y - refPt.y };
        const p2Ref = { x: p2.x - refPt.x, y: p2.y - refPt.y };

        // Calculate the cosine of the angle using the dot product and magnitude of vectors
        const cosTheta = dot(p1Ref, p2Ref) / (magnitude(p1Ref) * magnitude(p2Ref));

        // Calculate the angle in radians, and then convert to degrees
        const theta = Math.acos(Math.max(Math.min(cosTheta, 1.0), -1.0)); // Clamping value between -1 and 1 to avoid NaN errors
        const degree = theta * (180 / Math.PI);

        return Math.round(degree); // Return the angle rounded to the nearest integer for consistency with the Python version
    };

    //utlitity function convert seconds to minutes
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60); // Get whole minutes
        const remainingSeconds = Math.floor(seconds % 60); // Get remaining seconds rounded down
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Format string with padded seconds
    }

    // Utility function to draw text on the canvas
    const drawText = (ctx, msg, x, y, options = {}) => {
        const {
            boxWidth = 8, // Similar to 'width' in Python, though used differently here.
            textColor = 'rgb(0, 255, 0)', // Similar to 'text_color'.
            backgroundColor = 'rgb(0, 0, 0)', // Similar to 'text_color_bg'.
            fontSize = '16px', // Combines 'font' and 'font_scale' from Python.
            fontFamily = 'Arial', // Assumed from 'font', as HTML canvas does not support cv2 fonts.
            paddingX = 20, // Similar to 'box_offset' in Python but specified for X.
            paddingY = 10, // Similar to 'box_offset' in Python but specified for Y.
        } = options;

        // Set font for measuring and drawing text
        ctx.font = `${fontSize} ${fontFamily}`;

        // Measure how wide the text will be
        const textMetrics = ctx.measureText(msg);
        const textWidth = textMetrics.width;
        const textHeight = parseInt(fontSize, 10); // Extract number from font size string

        // Calculate background rectangle coordinates and dimensions
        const rectStartX = x - paddingX;
        const rectStartY = y - textHeight - paddingY;
        const rectWidth = textWidth + 2 * paddingX;
        const rectHeight = textHeight + 2 * paddingY;

        // Draw rounded rectangle as background
        drawRoundedRect(ctx, rectStartX, rectStartY, rectWidth, rectHeight, boxWidth, backgroundColor);

        // Draw text on top
        ctx.fillStyle = textColor;
        ctx.fillText(msg, x, y + (paddingY / 2)); // Adjust vertical position based on padding
    };

    const drawRoundedRect = (ctx, x, y, width, height, radius, fillColor) => {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.fill();
    };

    // Utility function to draw a circle on the canvas
    const drawCircle = (ctx, position, radius, color) => {
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };

    // Utility function to draw a line between two points on the canvas
    const drawConnector = (ctx, start, end, color, lineWidth) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    // Utility function to draw a dotted line
    const drawDottedLine = (ctx, start, end, color) => {
        const lineLength = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const dotSpacing = 5; // Space between dots
        const numOfDots = Math.floor(lineLength / dotSpacing);

        for (let i = 0; i < numOfDots; i++) {
            const dotX = start.x + ((end.x - start.x) / numOfDots) * i;
            const dotY = start.y + ((end.y - start.y) / numOfDots) * i;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 1, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
    };


    /*
     End of Utility functions for drawing text angle calculations and landmark features
     */

    // UseEffect hook to run the pose detection and analysis

    // Main function to process the pose results
    const onResults = useCallback((results) => {
        if (webcamRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = webcamRef.current.video.videoWidth;
            canvas.height = webcamRef.current.video.videoHeight;
            const frameWidth = canvas.width;
            const frameHeight = canvas.height;

            ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

            if (results.poseLandmarks) {

                const endTime = Date.now();
                // Calculate coordinates for each key landmark
                const noseCoord = getLandmarkFeatures(results.poseLandmarks, 'nose', frameWidth, frameHeight);
                const leftFeatures = getLandmarkFeatures(results.poseLandmarks, 'left', frameWidth, frameHeight);
                const rightFeatures = getLandmarkFeatures(results.poseLandmarks, 'right', frameWidth, frameHeight);

                const offsetAngle = findAngle(leftFeatures.shoulder, rightFeatures.shoulder, noseCoord);

                if (offsetAngle > currentThresholds.OFFSET_THRESH) {

                    // Draw the circles for nose, left shoulder, and right shoulder
                    drawCircle(ctx, noseCoord, 7, colors.white);
                    drawCircle(ctx, leftFeatures.shoulder, 7, colors.yellow);
                    drawCircle(ctx, rightFeatures.shoulder, 7, colors.magenta);

                    drawText(ctx, `CORRECT : ${formatTime(correctTime.current)}`, frameWidth * 0.68, 30, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(18, 185, 0)',
                        fontSize: '14px' // Adjusted for typical browser scaling; you may need to tweak this
                    });
                    drawText(ctx, `INCORRECT: ${formatTime(incorrectTime.current)}`, frameWidth * 0.68, 80, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(221, 0, 0)',
                        fontSize: '14px'
                    });

                    drawText(ctx, 'CAMERA NOT ALIGNED PROPERLY!!!', 30, frameHeight - 60, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(255, 153, 0)',
                        fontSize: '14px'
                    });
                    drawText(ctx, `OFFSET ANGLE: ${offsetAngle.toFixed(2)}`, 30, frameHeight - 30, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(255, 153, 0)',
                        fontSize: '14px'
                    });

                    startTime.current = endTime;

                }// Camera is aligned properly
                else {

                    const duration = (endTime - startTime.current) / 1000;

                    // Calculate distances from shoulder to foot for both sides
                    const distLShHip = Math.abs(leftFeatures.foot.y - leftFeatures.shoulder.y);
                    const distRShHip = Math.abs(rightFeatures.foot.y - rightFeatures.shoulder.y);

                    let selectedSideFeatures = null;

                    if (distLShHip > distRShHip) {
                        selectedSideFeatures = leftFeatures;
                    } else {
                        selectedSideFeatures = rightFeatures;
                    }

                    // draw the connections and points for the pose
                    drawConnector(ctx, selectedSideFeatures.shoulder, selectedSideFeatures.elbow, 'green', 2);
                    drawConnector(ctx, selectedSideFeatures.elbow, selectedSideFeatures.wrist, 'green', 2);
                    drawConnector(ctx, selectedSideFeatures.shoulder, selectedSideFeatures.hip, 'red', 2);
                    drawConnector(ctx, selectedSideFeatures.hip, selectedSideFeatures.knee, 'green', 2);
                    drawConnector(ctx, selectedSideFeatures.knee, selectedSideFeatures.ankle, 'green', 2);
                    drawConnector(ctx, selectedSideFeatures.shoulder, selectedSideFeatures.ear, 'purple', 2);
                    drawConnector(ctx, selectedSideFeatures.ankle, selectedSideFeatures.foot, 'green', 2);

                    // Calculate angles
                    const headAlignmentAngle = findAngle(
                        selectedSideFeatures.ear,
                        { x: selectedSideFeatures.shoulder.x, y: 0 }, // Virtual point directly above the shoulder
                        selectedSideFeatures.shoulder
                    );
                    const shoulderAlignmentAngle = findAngle(
                        { x: 0, y: selectedSideFeatures.shoulder.y }, // Virtual point directly to the right of the shoulder
                        selectedSideFeatures.elbow,
                        selectedSideFeatures.shoulder
                    );
                    const bodyAlignmentAngle = findAngle(
                        { x: selectedSideFeatures.hip.x, y: 0 }, // Virtual point directly below the hip
                        selectedSideFeatures.shoulder, // Virtual point directly above the hip
                        selectedSideFeatures.hip
                    );
                    const footAlignmentAngle = findAngle(
                        selectedSideFeatures.foot,
                        { x: 0, y: selectedSideFeatures.ankle.y }, // Virtual point directly above the hip
                        selectedSideFeatures.ankle
                    );

                    Object.values(selectedSideFeatures).forEach((point) => {
                        drawCircle(ctx, point, 5, 'blue'); // Drawing each landmark as a blue circle
                    });

                    // Display angles on the canvas
                    // drawText(ctx, `Head Alignment: ${headAlignmentAngle}°`, selectedSideFeatures.shoulder.x, selectedSideFeatures.shoulder.y - 40, { fontSize: '14px', textColor: 'yellow' });
                    // drawText(ctx, `Shoulder Alignment: ${shoulderAlignmentAngle}°`, selectedSideFeatures.shoulder.x + 30, selectedSideFeatures.shoulder.y + 20, { fontSize: '14px', textColor: 'yellow' });
                    // drawText(ctx, `Body Alignment: ${bodyAlignmentAngle}°`, selectedSideFeatures.hip.x - 10, selectedSideFeatures.hip.y - 40, { fontSize: '14px', textColor: 'yellow' });
                    // drawText(ctx, `Foot Alignment: ${footAlignmentAngle}°`, selectedSideFeatures.ankle.x - 10, selectedSideFeatures.ankle.y - 40, { fontSize: '14px', textColor: 'yellow' });

                    const isHeadAligned = () => headAlignmentAngle >= currentThresholds.HEAD_ALIGNMENT.NORMAL[0] && headAlignmentAngle <= currentThresholds.HEAD_ALIGNMENT.NORMAL[1];
                    const isBodyAligned = () => bodyAlignmentAngle >= currentThresholds.BODY_ALIGNMENT.NORMAL[0] && bodyAlignmentAngle <= currentThresholds.BODY_ALIGNMENT.NORMAL[1];
                    const isFootAligned = () => footAlignmentAngle >= currentThresholds.FOOT_ALIGNMENT.NORMAL[0] && footAlignmentAngle <= currentThresholds.FOOT_ALIGNMENT.NORMAL[1];
                    const isShoulderAligned = () => shoulderAlignmentAngle >= currentThresholds.SHOULDER_ALIGNMENT.NORMAL[0] && shoulderAlignmentAngle <= currentThresholds.SHOULDER_ALIGNMENT.NORMAL[1];

                    // Check if the pose is aligned properly
                    if (isHeadAligned() && isBodyAligned() && isFootAligned() && isShoulderAligned()) {
                        correctTime.current += duration;
                    } else {
                        incorrectTime.current += duration;
                    }
                    startTime.current = endTime;

                    // Display feedback if the pose is not aligned properly
                    if (headAlignmentAngle < currentThresholds.HEAD_ALIGNMENT.NORMAL[0]) {
                        drawText(ctx, ` ${FEEDBACK.lowerHead} : ${headAlignmentAngle}°`, selectedSideFeatures.shoulder.x, selectedSideFeatures.shoulder.y - 70, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[0] += 1;
                    }
                    if (headAlignmentAngle > currentThresholds.HEAD_ALIGNMENT.NORMAL[1]) {
                        drawText(ctx, ` ${FEEDBACK.raiseHead} : ${headAlignmentAngle}°`, selectedSideFeatures.shoulder.x, selectedSideFeatures.shoulder.y - 70, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[1] += 1;
                    }
                    if (bodyAlignmentAngle < currentThresholds.BODY_ALIGNMENT.NORMAL[0]) {
                        drawText(ctx, ` ${FEEDBACK.raiseHips} : ${bodyAlignmentAngle}°`, selectedSideFeatures.hip.x, selectedSideFeatures.hip.y - 70, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[2] += 1;
                    }
                    if (bodyAlignmentAngle > currentThresholds.BODY_ALIGNMENT.NORMAL[1]) {
                        drawText(ctx, ` ${FEEDBACK.lowerHips} : ${bodyAlignmentAngle}°`, selectedSideFeatures.hip.x, selectedSideFeatures.hip.y - 70, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[3] += 1;
                    }
                    if (footAlignmentAngle > currentThresholds.FOOT_ALIGNMENT.NORMAL[1] || footAlignmentAngle < currentThresholds.FOOT_ALIGNMENT.NORMAL[0]) {
                        drawText(ctx, ` ${FEEDBACK.feetVertical} : ${footAlignmentAngle}°`, selectedSideFeatures.ankle.x, selectedSideFeatures.ankle.y - 70, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[4] += 1;
                    }
                    if (shoulderAlignmentAngle > currentThresholds.SHOULDER_ALIGNMENT.NORMAL[1] || shoulderAlignmentAngle < currentThresholds.SHOULDER_ALIGNMENT.NORMAL[0]) {
                        drawText(ctx, ` ${FEEDBACK.shouldersVertical} : ${shoulderAlignmentAngle}°`, selectedSideFeatures.shoulder.x, selectedSideFeatures.shoulder.y + 20, { fontSize: '14px', textColor: 'red' });
                        feedbackCounts.current[5] += 1;
                    }

                    // Displaying Correct Squats Count
                    drawText(ctx, `CORRECT: ${formatTime(correctTime.current)}`, frameWidth * 0.68, 30, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(18, 185, 0)',
                        fontSize: '14px'
                    });

                    // Displaying Incorrect Squats Count
                    drawText(ctx, `INCORRECT: ${formatTime(incorrectTime.current)}`, frameWidth * 0.68, 80, {
                        textColor: 'rgb(255, 255, 230)',
                        backgroundColor: 'rgb(221, 0, 0)',
                        fontSize: '14px'
                    });

                }

            }
            else {

                // Reset all other state variables
            }
        }
    }, [webcamRef, canvasRef]);

    // UseEffect hook to run the pose detection and analysis
    useEffect(() => {

        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        let camera;
        const startCamera = () => {
            if (webcamRef.current && webcamRef.current.video) {
                camera = new cam.Camera(webcamRef.current.video, {
                    onFrame: async () => {
                        if (webcamRef.current && webcamRef.current.video) { // Additional check to prevent accessing video of null
                            await pose.send({ image: webcamRef.current.video });
                        }
                    },
                    width: 640,
                    height: 480,
                });
                camera.start();
            }
        };

        pose.onResults(onResults);
        startCamera();

        return () => {
            if (camera) {
                camera.stop();
            }
            if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.srcObject) {
                const tracks = webcamRef.current.video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            pose.close();

            // Call endSession when the component unmounts
            endCurrentSession();
        };
    }, [onResults]); // Notice how we use the onResults function within the dependencies list.


    useEffect(() => {
        const initiateSession = debounce(async () => {
            try {
                const response = await startSession('plank');
                console.log('Session started:', response);
                setSessionStarted(true); // Set session started to true only if API call is successful
            } catch (error) {
                console.error('Error starting session:', error);
            }
        }, 1000); // debounce duration of 300ms

        initiateSession();

        return () => {
            initiateSession.cancel(); // cancel any pending debounced calls on component unmount
        };
    }, []); // This useEffect runs only once on component mount

    // update session every 5 seconds
    useEffect(() => {
        if (!sessionStarted || sessionEnded) return;

        const intervalId = setInterval(async () => {
            try {
                const correct = stateTrackerRef.current.SQUAT_COUNT;
                const incorrect = stateTrackerRef.current.IMPROPER_SQUAT;
                const feedback = stateTrackerRef.current.COUNT_FRAMES.reduce((obj, count, index) => {
                    obj[index] = count;
                    return obj;
                }, {});
                console.log('Updating session...', { correct, incorrect, feedback });
                await updateSession({ correct, incorrect, feedback });
                console.log('Session updated');
            } catch (error) {
                console.error('Error updating session:', error);
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [sessionStarted, sessionEnded]); // This useEffect runs whenever `sessionStarted` or `sessionEnded` changes


    // useEffect for ending session
    const endCurrentSession = async () => {
        if (!sessionStarted || sessionEnded) return; // Prevent multiple calls and ensure session was started

        try {
            const correct = correctTime.current;
            const incorrect = incorrectTime.current;
            const feedback = feedbackCounts.current.reduce((obj, count, index) => {
                obj[index] = count;
                return obj;
            }, {});

            await endSession({ correct, incorrect, feedback });
            console.log('Session ended');
            setSessionEnded(true); // Set sessionEnded to true after successful endSession call
        } catch (error) {
            console.error('Error ending session:', error);
        }
    };

    const handleNavigate = () => {
        navigate('/main');
    };

    // Function to handle ending the current session and navigating back to the main page
    const handleEndSessionAndNavigate = async () => {
        await endCurrentSession();
        handleNavigate();
    };

    // Function to handle mode change
    const handleModeChange = (event) => {
        const isBeginner = event.target.value === 'beginner';
        setIsBeginnerMode(isBeginner);
        const newThresholds = isBeginner ? thresholdsBeginner : thresholdsPro;
        setCurrentThresholds(newThresholds);
        console.log('Current Thresholds:', newThresholds);
    };


    return (
        <div className="bg-gray-100 w-full h-screen flex justify-center items-center overflow-hidden relative"> {/* Full screen, center content, and make position relative for floating elements */}
            <div className="absolute top-0 left-0 m-4 flex items-center"> {/* Flex container for back button and text */}
                <button
                    onClick={handleEndSessionAndNavigate}
                    className="bg-[#F95501] p-2 rounded-md shadow hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center z-10" // Theme color for button
                    aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="text-white bg-[#F95501] ml-4 py-2 px-4 rounded-md shadow"> {/* Box with theme color background and white text */}
                    Plank Exercise
                </div>
            </div>
            <div className="absolute top-0 right-0 m-4">
                <select
                    onChange={handleModeChange}
                    className="text-white bg-[#F95501] p-2 rounded-md shadow"
                    value={isBeginnerMode ? 'beginner' : 'pro'}
                >
                    <option value="beginner">Beginner Mode</option>
                    <option value="pro">Pro Mode</option>
                </select>
            </div>
            <div className="relative w-full max-w-screen-lg mx-auto"> {/* Max width for larger screens, centering */}
                {/* Webcam is hidden but can adjust if needed, maintaining aspect ratio */}
                <Webcam
                    ref={webcamRef}
                    style={{ display: 'none' }}
                />
                {/* Canvas fills parent, maintains aspect ratio */}
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-contain"
                    style={{
                        maxWidth: '100vw', /* Maximum width */
                        maxHeight: '100vh', /* Maximum height */
                        position: 'relative',
                        left: 0,
                        top: 0
                    }}
                />
            </div>
        </div>
    );

}

export default PlankExercise;
