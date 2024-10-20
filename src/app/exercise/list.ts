interface Exercise {
    title: string;
    description: string;
}

interface ExercisesByMood {
    joy: Exercise[];
    neutral: Exercise[];
    sadness: Exercise[];
    anger: Exercise[];
    disgust: Exercise[];
    fear: Exercise[];
    surprise: Exercise[];
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
        },
        {
            title: "Joy Visualization",
            description: "Imagine a joyful moment in your life in vivid detail. Relive that experience, savoring the emotions and sensations of happiness."
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
        },
        {
            title: "Mindful Eating",
            description: "Choose a small piece of food and eat it slowly, paying attention to its taste, texture, and smell without distractions."
        }
    ],
    sadness: [
        {
            title: "Compassion Meditation",
            description: "Focus on self-compassion. Imagine yourself as a friend in need of care and offer kindness to yourself in thoughts."
        },
        {
            title: "Grounding Exercise",
            description: "Notice 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
        },
        {
            title: "Rainy Day Visualization",
            description: "Imagine yourself sitting by a window, observing the rain. Allow yourself to feel your emotions and let them flow like raindrops."
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
        },
        {
            title: "Anger Visualization",
            description: "Visualize your anger as a fire. Imagine slowly pouring water on it until the flames die down, leaving only calm and peace."
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
        },
        {
            title: "Neutralizing Disgust",
            description: "Visualize the source of your disgust as something less intense, gradually replacing negative emotions with neutral or positive ones."
        }
    ],
    fear: [
        {
            title: "Safe Space Visualization",
            description: "Close your eyes and visualize a place where you feel completely safe. Imagine every detail of this place and let yourself relax into it."
        },
        {
            title: "4-7-8 Breathing",
            description: "Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. This technique helps calm the nervous system and reduce anxiety."
        },
        {
            title: "Courage Affirmations",
            description: "Repeat affirmations that build courage, such as 'I am capable,' 'I am brave,' and 'I can handle this.' Focus on strengthening your inner resolve."
        }
    ],
    surprise: [
        {
            title: "Surprise Visualization",
            description: "Recall a pleasant surprise and relive the moment in your mind, focusing on the excitement and joy it brought you."
        },
        {
            title: "Mindful Reaction",
            description: "When surprised, pause and breathe deeply. Observe your immediate reaction without judgment and allow yourself to process it calmly."
        },
        {
            title: "Refocusing Attention",
            description: "Shift your focus from the surprise to your breath or a calming object in your surroundings. This helps ground you and re-establish control."
        }
    ]
};

export default mindfulExercises;
