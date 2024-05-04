import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { thresholdsBeginner, thresholdsPro } from './SquatThresholds';

function SquatExercise() {

  //webcam and canvas references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Mode: beginner or pro
  const [isBeginnerMode, setIsBeginnerMode] = useState(true); // Default to beginner mode

  const flipFrameRef = useRef(false);
  const currentThresholds = isBeginnerMode ? thresholdsBeginner : thresholdsPro // Place to store your thresholds

  // State tracker for the pose analysis
  const stateTrackerRef = useRef({
    state_seq: [],
    start_inactive_time: Date.now(),
    start_inactive_time_front: Date.now(),
    INACTIVE_TIME: 0.0,
    INACTIVE_TIME_FRONT: 0.0,
    DISPLAY_TEXT: Array(4).fill(false),
    COUNT_FRAMES: Array(4).fill(0),
    LOWER_HIPS: false,
    INCORRECT_POSTURE: false,
    prev_state: null,
    curr_state: null,
    SQUAT_COUNT: 0,
    IMPROPER_SQUAT: 0
  });

  const dictFeatures = {
    left: {
      shoulder: 11,
      elbow: 13,
      wrist: 15,
      hip: 23,
      knee: 25,
      ankle: 27,
      foot: 31,
    },
    right: {
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

  const colors = {
    blue: 'rgb(0,127,255)',
    red: 'rgb(255,50,50)',
    green: 'rgb(0,255,127)',
    light_green: 'rgb(100,233,127)',
    yellow: 'rgb(255,255,0)',
    magenta: 'rgb(255,0,255)',
    white: 'rgb(255,255,255)',
    cyan: 'rgb(0,255,255)',
    light_blue: 'rgb(102,204,255)'
  };

  const FEEDBACK_ID_MAP = {
    0: { text: 'BEND BACKWARDS', position: 215, color: 'rgb(0,153,255)' },
    1: { text: 'BEND FORWARD', position: 215, color: 'rgb(0,153,255)' },
    2: { text: 'KNEE FALLING OVER TOE', position: 170, color: 'rgb(255,80,80)' },
    3: { text: 'SQUAT TOO DEEP', position: 125, color: 'rgb(255,80,80)' }
  };

  // Function to get the state of the knee
  const getState = (kneeAngle) => {
    let state = null;
    if (kneeAngle >= currentThresholds.ANGLE_HIP_KNEE_VERT.NORMAL[0] && kneeAngle <= currentThresholds.ANGLE_HIP_KNEE_VERT.NORMAL[1]) {
      state = 's1';
    } else if (kneeAngle >= currentThresholds.ANGLE_HIP_KNEE_VERT.TRANS[0] && kneeAngle <= currentThresholds.ANGLE_HIP_KNEE_VERT.TRANS[1]) {
      state = 's2';
    } else if (kneeAngle >= currentThresholds.ANGLE_HIP_KNEE_VERT.PASS[0] && kneeAngle <= currentThresholds.ANGLE_HIP_KNEE_VERT.PASS[1]) {
      state = 's3';
    }
    return state;
  };

  // Update the state sequence based on the new state
  const updateStateSequence = (newState) => {
    let updatedStateSeq = [...stateTrackerRef.current.state_seq];

    if (newState === 's2') {
      if ((!updatedStateSeq.includes('s3') && updatedStateSeq.filter(state => state === 's2').length === 0) ||
        (updatedStateSeq.includes('s3') && updatedStateSeq.filter(state => state === 's2').length === 1)) {
        updatedStateSeq.push(newState);
      }
    } else if (newState === 's3') {
      if (!updatedStateSeq.includes('s3') && updatedStateSeq.includes('s2')) {
        updatedStateSeq.push(newState);
      }
    }

    stateTrackerRef.current.state_seq = updatedStateSeq;
  };


  // Show feedback based on the current state
  // This function now doesn't require parameters for stateTracker and FEEDBACK_ID_MAP
  const showFeedback = (ctx) => {
    // Access the current state using stateTrackerRef.current
    const stateTracker = stateTrackerRef.current;

    if (stateTracker.LOWER_HIPS) {
      drawText(ctx, 'LOWER YOUR HIPS', 30, 80, {
        textColor: 'black',
        backgroundColor: 'yellow',
        fontSize: '16px'
      });
    }

    // Iterate over DISPLAY_TEXT to show feedback messages
    stateTracker.DISPLAY_TEXT.forEach((displayText, index) => {
      if (displayText) {
        const feedback = FEEDBACK_ID_MAP[index];
        if (feedback) {
          drawText(ctx, feedback.text, 30, feedback.position, {
            textColor: 'black',
            backgroundColor: 'yellow',
            fontSize: '16px'
          });
        }
      }
    });
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
        foot: getLandmarkPosition(poseLandmarks[featureSet.foot], frameWidth, frameHeight)
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

    pose.onResults(onResults);

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = webcamRef.current.video.videoWidth;
    canvas.height = webcamRef.current.video.videoHeight;
    const frameWidth = canvas.width;
    const frameHeight = canvas.height;

    ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

    let displayInactivity = false;
    let endTime = Date.now();

    if (results.poseLandmarks) {
      // Calculate coordinates for each key landmark
      const noseCoord = getLandmarkFeatures(results.poseLandmarks, 'nose', frameWidth, frameHeight);
      const leftFeatures = getLandmarkFeatures(results.poseLandmarks, 'left', frameWidth, frameHeight);
      const rightFeatures = getLandmarkFeatures(results.poseLandmarks, 'right', frameWidth, frameHeight);

      const offsetAngle = findAngle(leftFeatures.shoulder, rightFeatures.shoulder, noseCoord);

      if (offsetAngle > currentThresholds.OFFSET_THRESH) {
        displayInactivity = false;

        endTime = Date.now(); // Equivalent to time.perf_counter()
        stateTrackerRef.current.INACTIVE_TIME_FRONT += endTime - stateTrackerRef.current.start_inactive_time_front;
        stateTrackerRef.current.start_inactive_time_front = endTime;

        if (stateTrackerRef.current.INACTIVE_TIME_FRONT >= currentThresholds.INACTIVE_THRESH) {
          // stateTrackerRef.current.SQUAT_COUNT = 0;
          // stateTrackerRef.current.IMPROPER_SQUAT = 0;
          displayInactivity = true;
        }

        // Draw the circles for nose, left shoulder, and right shoulder
        drawCircle(ctx, noseCoord, 7, colors.white);
        drawCircle(ctx, leftFeatures.shoulder, 7, colors.yellow);
        drawCircle(ctx, rightFeatures.shoulder, 7, colors.magenta);

        // Handle frame flip if needed
        if (flipFrameRef.current) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0); // Translate back after flipping
        }

        if (displayInactivity) {
          // Directly manipulate the ref to reset counters and inactivity time
          stateTrackerRef.current.INACTIVE_TIME_FRONT = 0;
          stateTrackerRef.current.start_inactive_time_front = Date.now();
        }

        drawText(ctx, `CORRECT: ${stateTrackerRef.current.SQUAT_COUNT}`, frameWidth * 0.68, 30, {
          textColor: 'rgb(255, 255, 230)',
          backgroundColor: 'rgb(18, 185, 0)',
          fontSize: '14px' // Adjusted for typical browser scaling; you may need to tweak this
        });
        drawText(ctx, `INCORRECT: ${stateTrackerRef.current.IMPROPER_SQUAT}`, frameWidth * 0.68, 80, {
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

        // Reset inactive times for side view
        stateTrackerRef.current.start_inactive_time = Date.now();
        stateTrackerRef.current.INACTIVE_TIME = 0;
        stateTrackerRef.current.prev_state = null;
        stateTrackerRef.current.curr_state = null;

      }// Camera is aligned properly
      else {

        stateTrackerRef.current.INACTIVE_TIME_FRONT = 0;
        stateTrackerRef.current.start_inactive_time_front = Date.now();

        const distLShHip = Math.abs(leftFeatures.foot.y - leftFeatures.shoulder.y);
        const distRShHip = Math.abs(rightFeatures.foot.y - rightFeatures.shoulder.y);

        let selectedSideFeatures = null;
        let multiplier = 0;

        if (distLShHip > distRShHip) {
          selectedSideFeatures = leftFeatures;
          multiplier = -1;
        } else {
          selectedSideFeatures = rightFeatures;
          multiplier = 1;
        }
        // -------------------- Verical Angle calculation ----------------------------------------------

        // Hip vertical angle calculation
        const hip_vertical_angle = findAngle(selectedSideFeatures.shoulder, { x: selectedSideFeatures.hip.x, y: 0 }, selectedSideFeatures.hip);
        drawCircle(ctx, selectedSideFeatures.hip, 15, colors.white);  // As an alternative to cv2.ellipse
        let verticalStart = { x: selectedSideFeatures.hip.x, y: selectedSideFeatures.hip.y - 80 };
        let verticalEnd = { x: selectedSideFeatures.hip.x, y: selectedSideFeatures.hip.y + 20 };
        drawDottedLine(ctx, verticalStart, verticalEnd, colors.blue);

        // Knee vertical angle calculation
        const knee_vertical_angle = findAngle(selectedSideFeatures.hip, { x: selectedSideFeatures.knee.x, y: 0 }, selectedSideFeatures.knee);
        drawCircle(ctx, selectedSideFeatures.knee, 10, colors.white);  // Corrected from leftFeatures.hip to selectedSideFeatures.knee
        verticalStart = { x: selectedSideFeatures.knee.x, y: selectedSideFeatures.knee.y - 50 };
        verticalEnd = { x: selectedSideFeatures.knee.x, y: selectedSideFeatures.knee.y + 20 };
        drawDottedLine(ctx, verticalStart, verticalEnd, colors.blue);

        // Calculating ankle vertical angle. 
        const ankle_vertical_angle = findAngle(selectedSideFeatures.knee, { x: selectedSideFeatures.ankle.x, y: 0 }, selectedSideFeatures.ankle);
        drawCircle(ctx, selectedSideFeatures.ankle, 15, colors.white); // As an alternative to cv2.ellipse
        const ankleVerticalStart = { x: selectedSideFeatures.ankle.x, y: selectedSideFeatures.ankle.y - 50 };
        const ankleVerticalEnd = { x: selectedSideFeatures.ankle.x, y: selectedSideFeatures.ankle.y + 20 };
        drawDottedLine(ctx, ankleVerticalStart, ankleVerticalEnd, colors.blue);

        // Join landmarks using selectedSideFeatures instead of leftFeatures.
        drawConnector(ctx, selectedSideFeatures.shoulder, selectedSideFeatures.elbow, colors.light_blue, 4);
        drawConnector(ctx, selectedSideFeatures.wrist, selectedSideFeatures.elbow, colors.light_blue, 4);
        drawConnector(ctx, selectedSideFeatures.shoulder, selectedSideFeatures.hip, colors.light_blue, 4);
        drawConnector(ctx, selectedSideFeatures.knee, selectedSideFeatures.hip, colors.light_blue, 4);
        drawConnector(ctx, selectedSideFeatures.ankle, selectedSideFeatures.knee, colors.light_blue, 4);
        drawConnector(ctx, selectedSideFeatures.ankle, selectedSideFeatures.foot, colors.light_blue, 4);

        drawCircle(ctx, selectedSideFeatures.shoulder, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.elbow, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.wrist, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.hip, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.knee, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.ankle, 7, colors.yellow);
        drawCircle(ctx, selectedSideFeatures.foot, 7, colors.yellow);

        const curr_state = getState(knee_vertical_angle);
        stateTrackerRef.current.curr_state = curr_state;
        updateStateSequence(curr_state);

        // ------------- COMPUTE COUNTERS ------------------
        const { state_seq, INCORRECT_POSTURE } = stateTrackerRef.current;

        if (curr_state === 's1') {
          if (state_seq.length === 3 && !INCORRECT_POSTURE) {
            stateTrackerRef.current.SQUAT_COUNT += 1;

          } else if (state_seq.includes('s2') && state_seq.length === 1) {
            stateTrackerRef.current.IMPROPER_SQUAT += 1;

          } else if (INCORRECT_POSTURE) {
            stateTrackerRef.current.IMPROPER_SQUAT += 1;

          }

          stateTrackerRef.current.state_seq = [];
          stateTrackerRef.current.INCORRECT_POSTURE = false;
        }
        else { // ------------ PERFORM FEEDBACK ACTIONS -------------
          const stateTracker = stateTrackerRef.current;

          if (hip_vertical_angle > currentThresholds.HIP_THRESH[1]) {
            stateTracker.DISPLAY_TEXT[0] = true;

          } else if (hip_vertical_angle < currentThresholds.HIP_THRESH[0] && stateTracker.state_seq.filter(e => e === 's2').length === 1) {
            stateTracker.DISPLAY_TEXT[1] = true;
          }

          if (currentThresholds.KNEE_THRESH[0] < knee_vertical_angle && knee_vertical_angle < currentThresholds.KNEE_THRESH[1] && stateTracker.state_seq.filter(e => e === 's2').length === 1) {
            stateTracker.LOWER_HIPS = true;

          } else if (knee_vertical_angle > currentThresholds.KNEE_THRESH[2]) {
            stateTracker.DISPLAY_TEXT[3] = true;
            stateTracker.INCORRECT_POSTURE = true;
          }

          if (ankle_vertical_angle > currentThresholds.ANKLE_THRESH) {
            stateTracker.DISPLAY_TEXT[2] = true;
            stateTracker.INCORRECT_POSTURE = true;
          }

        }

        // --------------------- COMPUTE INACTIVITY TIME ------------------------------------------------------
        displayInactivity = false

        if (stateTrackerRef.current.curr_state === stateTrackerRef.current.prev_state) {
          endTime = Date.now();
          stateTrackerRef.current.INACTIVE_TIME += endTime - stateTrackerRef.current.start_inactive_time;
          stateTrackerRef.current.start_inactive_time = endTime;

          if (stateTrackerRef.INACTIVE_TIME >= currentThresholds.INACTIVE_THRESH) {
            // stateTrackerRef.current.SQUAT_COUNT = 0;
            // stateTrackerRef.current.IMPROPER_SQUAT = 0;
            displayInactivity = true;
          }
        }
        else {
          stateTrackerRef.current.start_inactive_time = Date.now();
          stateTrackerRef.current.INACTIVE_TIME = 0;
        }
        // ------------------------------------------------------------------------------------

        const hipTextCoordX = flipFrameRef.current ? frameWidth - selectedSideFeatures.hip.x + 10 : selectedSideFeatures.hip.x + 10;
        const kneeTextCoordX = flipFrameRef.current ? frameWidth - selectedSideFeatures.knee.x + 15 : selectedSideFeatures.knee.x + 15;
        const ankleTextCoordX = flipFrameRef.current ? frameWidth - selectedSideFeatures.ankle.x + 10 : selectedSideFeatures.ankle.x + 10;

        if (stateTrackerRef.current.state_seq.includes('s3') || curr_state === 's1') {
          stateTrackerRef.current.LOWER_HIPS = false;
        }

        stateTrackerRef.current.DISPLAY_TEXT.forEach((displayText, index) => {
          if (displayText) {
            stateTrackerRef.current.COUNT_FRAMES[index] += 1;
          }
        });

        showFeedback(ctx);

        if (displayInactivity) {
          stateTrackerRef.current.start_inactive_time = Date.now();
          stateTrackerRef.current.INACTIVE_TIME = 0;

        }

        drawText(ctx, `Hip Angle: ${hip_vertical_angle.toFixed(2)}`, hipTextCoordX, selectedSideFeatures.hip[1], {
          textColor: colors.light_green,
          fontSize: '16px',
        });

        drawText(ctx, `Knee Angle: ${knee_vertical_angle.toFixed(2)}`, kneeTextCoordX, selectedSideFeatures.knee[1] + 10, {
          textColor: colors.light_green,
          fontSize: '16px',
        });

        drawText(ctx, `Ankle Angle: ${ankle_vertical_angle.toFixed(2)}`, ankleTextCoordX, selectedSideFeatures.ankle[1], {
          textColor: colors.light_green,
          fontSize: '16px',
        });

        // Displaying Correct Squats Count
        drawText(ctx, `CORRECT: ${stateTrackerRef.current.SQUAT_COUNT}`, frameWidth * 0.68, 30, {
          textColor: 'rgb(255, 255, 230)',
          backgroundColor: 'rgb(18, 185, 0)',
          fontSize: '14px'
        });

        // Displaying Incorrect Squats Count
        drawText(ctx, `INCORRECT: ${stateTrackerRef.current.IMPROPER_SQUAT}`, frameWidth * 0.68, 80, {
          textColor: 'rgb(255, 255, 230)',
          backgroundColor: 'rgb(221, 0, 0)',
          fontSize: '14px'
        });

        // Resetting Display Text and Count Frames
        stateTrackerRef.current.DISPLAY_TEXT.forEach((_, index) => {
          if (stateTrackerRef.current.COUNT_FRAMES[index] > currentThresholds.CNT_FRAME_THRESH) {
            stateTrackerRef.current.DISPLAY_TEXT[index] = false;
            stateTrackerRef.current.COUNT_FRAMES[index] = 0;
          }
        });

        stateTrackerRef.current.prev_state = curr_state;

      

      }

    }
    else{

      if (flipFrameRef.current) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation to default after flipping
      }

      const endTime = Date.now();
      stateTrackerRef.current.INACTIVE_TIME += endTime - stateTrackerRef.current.start_inactive_time;

      let displayInactivity = false;

      if (stateTrackerRef.current.INACTIVE_TIME >= currentThresholds.INACTIVE_THRESH) {
        // stateTrackerRef.current.SQUAT_COUNT = 0;
        // stateTrackerRef.current.IMPROPER_SQUAT = 0;
        displayInactivity = true;
      }

      stateTrackerRef.current.start_inactive_time = endTime;

      drawText(ctx, `CORRECT: ${stateTrackerRef.current.SQUAT_COUNT}`, frameWidth * 0.68, 30, {
        textColor: 'rgb(255, 255, 230)',
        backgroundColor: 'rgb(18, 185, 0)',
        fontSize: '14px'
      });

      drawText(ctx, `INCORRECT: ${stateTrackerRef.current.IMPROPER_SQUAT}`, frameWidth * 0.68, 80, {
        textColor: 'rgb(255, 255, 230)',
        backgroundColor: 'rgb(221, 0, 0)',
        fontSize: '14px'
      });

      if (displayInactivity) {
        stateTrackerRef.current.start_inactive_time = Date.now();
        stateTrackerRef.current.INACTIVE_TIME = 0;
      }

      // Reset all other state variables
      stateTrackerRef.current.prev_state = null;
      stateTrackerRef.current.curr_state = null;
      stateTrackerRef.current.INACTIVE_TIME_FRONT = 0;
      stateTrackerRef.current.INCORRECT_POSTURE = false;
      stateTrackerRef.current.DISPLAY_TEXT = Array(5).fill(false);
      stateTrackerRef.current.COUNT_FRAMES = Array(5).fill(0);
      stateTrackerRef.current.start_inactive_time_front = Date.now();
    }
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex justify-center items-center overflow-hidden relative"> {/* Full screen, center content, and make position relative for floating elements */}
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

export default SquatExercise;
