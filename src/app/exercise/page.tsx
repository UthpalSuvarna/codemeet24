import { auth } from "@/auth";
import Exercises from "./excercise";
import { prisma } from "@/lib/prisma";
import mindfulExercises from "./list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MindfulExcercise() {
  const session = await auth();


  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id
    }
  })
  const suggestedMood = user?.status;
  const suggestedExercises = mindfulExercises[suggestedMood as keyof typeof mindfulExercises] || []
  const status = user?.status
  return (<div className="flex justify-center items-center ">
    <div className="pt-12 max-w-2xl mt-5">
      <h1 className="text-2xl font-bold">Suggested Excercise</h1>
      <div>
        {suggestedExercises.length > 0 ? (
          suggestedExercises.map((exercise, index) => (
            <Card key={`${suggestedMood}-${index}`} className="flex flex-col justify-between my-5">
              <CardHeader>
                <CardTitle className="text-2xl font-bold capitalize">{suggestedMood}</CardTitle>
                <CardDescription className="text-lg font-semibold">{exercise.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{exercise.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No exercises available for this mood.</p>
        )}
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Other Excercise</h1>
        {Object.keys(mindfulExercises).filter((emotion) => emotion !== suggestedMood).map((emotion) => (
          <div key={emotion}>
            {mindfulExercises[emotion as keyof typeof mindfulExercises].map((exercise, index) => (
              <Card key={`${emotion}-${index}`} className="flex flex-col justify-between my-5">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold capitalize">{emotion}</CardTitle>
                  <CardDescription className="text-lg font-semibold">{exercise.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{exercise.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>)
}