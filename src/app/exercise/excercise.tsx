'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Exercise = {
    id: number;
    title: string;
    description: string;
    duration: number;
}

const exercises: Exercise[] = [
    { id: 1, title: "Deep Breathing", description: "Focus on your breath, inhaling deeply and exhaling slowly.", duration: 300 },
    { id: 2, title: "Body Scan", description: "Mentally scan your body from head to toe, noticing any sensations.", duration: 600 },
    { id: 3, title: "Mindful Walking", description: "Walk slowly, focusing on each step and your surroundings.", duration: 480 },
    { id: 4, title: "Gratitude Practice", description: "Think of three things you're grateful for today.", duration: 180 },
]

export default function Exercises() {
    const [mainExercise, setMainExercise] = useState<Exercise>(exercises[0])
    const [otherExercises, setOtherExercises] = useState<Exercise[]>(exercises.slice(1))
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isTimerRunning && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        } else if (timeLeft === 0) {
            setIsTimerRunning(false)
        }
        return () => clearTimeout(timer)
    }, [isTimerRunning, timeLeft])

    const startExercise = (exercise: Exercise) => {
        setMainExercise(exercise)
        setOtherExercises(exercises.filter(e => e.id !== exercise.id))
        setTimeLeft(exercise.duration)
        setIsTimerRunning(true)
    }

    const stopTimer = () => {
        setIsTimerRunning(false)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Mindful Exercises</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>{mainExercise.title}</CardTitle>
                    <CardDescription>{mainExercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-4" aria-live="polite">
                            {isTimerRunning ? formatTime(timeLeft) : formatTime(mainExercise.duration)}
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button
                                onClick={() => startExercise(mainExercise)}
                                disabled={isTimerRunning}
                            >
                                {isTimerRunning ? 'In Progress' : 'Start Exercise'}
                            </Button>
                            {isTimerRunning && (
                                <Button
                                    onClick={stopTimer}
                                    className="bg-red-500 text-white"
                                >
                                    Stop Timer
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Other Exercises</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {otherExercises.map((exercise) => (
                    <Card key={exercise.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startExercise(exercise)}>
                        <CardHeader>
                            <CardTitle>{exercise.title}</CardTitle>
                            <CardDescription>{formatTime(exercise.duration)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{exercise.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
