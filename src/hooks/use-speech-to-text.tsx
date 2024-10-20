"use client";

import { useState, useRef, useEffect } from "react";

export const useSpeechToText = (options: any) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (
            (typeof window !== "undefined" && "SpeechRecognition" in window) ||
            "webkitSpeechRecognition" in window
        ) {
            recognitionRef.current = new window.SpeechRecognition() || new window.webkitSpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.interimResults = options.interimResults || true;
            recognition.lang = options.lang || "en-US";
            recognition.continuous = options.continuous || false;

            if ("webkitSpeechGrammarList" in window) {
                const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ;";
                const speechRecognitionList = new window.webkitSpeechGrammarList();
                speechRecognitionList.addFromString(grammar, 1);
                recognition.grammars = speechRecognitionList;
            }

            recognition.onresult = (event: any) => {
                let text = "";
                for (let i = 0; i < event.results.length; i++) {
                    text += event.results[i][0].transcript;
                }
                setTranscript(text);
            };
            recognition.onerror = (event: any) => {
                console.log("Speech recognition error detected: " + event.error);
            };

            recognition.onend = () => {
                setIsListening(false);
                setTranscript("");
            };

            return () => {
                recognition.stop();
            };
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
    return (
        <div>
            <h1>Speech to Text</h1>
        </div>
    );
};
