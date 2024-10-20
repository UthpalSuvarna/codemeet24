interface Exercise {
    title: string;
    description: string;
}

interface ExercisesByMood {
    joy: Exercise[];
    neutral: Exercise[];
    sad: Exercise[];
    anger: Exercise[];
    disgust: Exercise[];
}

const mindfulExercises: ExercisesByMood = {
    joy: [
        {
            title: "Gratitude Meditation",
            description: "Reflect on 3 things you're grateful for to enhance feelings of joy. Close your eyes and focus on these positive experiences."
        },
        {
            title: "Loving-kindness Meditation",
            description: "Focus on spreading joy to others by silently wishing them well and sending positive thoughts."
        }
    ],
    neutral: [
        {
            title: "Body Scan",
            description: "A gentle body awareness practice that helps you reconnect with physical sensations, moving attention from head to toe."
        },
        {
            title: "Mindful Breathing",
            description: "A simple breathing exercise to center your mind, focusing on slow, deep breaths to maintain a sense of calm."
        }
    ],
    sad: [
        {
            title: "Compassion Meditation",
            description: "Focus on self-compassion. Imagine yourself as a friend in need of care and offer kindness to yourself in thoughts."
        },
        {
            title: "Grounding Exercise",
            description: "Notice 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
        }
    ],
    anger: [
        {
            title: "Progressive Muscle Relaxation",
            description: "Tense and release muscles to calm the body and release anger-related tension."
        },
        {
            title: "Cooling Breath",
            description: "Breathe in deeply through the mouth with a cooling sensation by curling your tongue, then exhale through the nose."
        }
    ],
    disgust: [
        {
            title: "Mindful Walking",
            description: "Take a walk, paying attention to your steps and surroundings. Focus on the sensation of walking and the environment to clear your mind."
        },
        {
            title: "Acceptance Meditation",
            description: "Practice acceptance by acknowledging your feelings without judgment, observing them as they are, and letting them pass."
        }
    ]
};

export default mindfulExercises;
