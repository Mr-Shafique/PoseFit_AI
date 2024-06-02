// Thresholds for plank exercise analysis in beginner mode
export const thresholdsBeginner = {
    HEAD_ALIGNMENT: {
        NORMAL: [65, 100], // Ideal head alignment range
    },
    BODY_ALIGNMENT: {
        NORMAL: [60, 100], // Ideal body alignment range
    },
    SHOULDER_ALIGNMENT: {
        NORMAL: [70, 105], // Ideal shoulder alignment range
    },
    FOOT_ALIGNMENT: {
        NORMAL: [70, 110], // Ideal foot alignment range
    },
    OFFSET_THRESH: 35.0, // Threshold for determining side view alignment
    INACTIVE_THRESH: 15.0, // Seconds of inactivity to trigger feedback
    CNT_FRAME_THRESH: 50, // Number of frames to consider for stable measurement
};

// Thresholds for plank exercise analysis in pro mode
export const thresholdsPro = {
    HEAD_ALIGNMENT: {
        NORMAL: [65, 75], // More strict or same as beginner for professionals
    },
    BODY_ALIGNMENT: {
        NORMAL: [80, 85], // Narrower range for professionals
    },
    SHOULDER_ALIGNMENT: {
        NORMAL: [80, 90], // Narrower range for professionals
    },
    FOOT_ALIGNMENT: {
        NORMAL: [80, 90], // Narrower range for professionals
    },
    OFFSET_THRESH: 30.0, // More precise alignment for professionals
    INACTIVE_THRESH: 10.0, // Reduced inactivity threshold for professionals
    CNT_FRAME_THRESH: 75, // Increased frame threshold for more precise measurement
};
