import { auth } from "@/auth";
import Profile from "./profile";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();



  if (!session) {
    return (<>
      <div className="pt-10 flex items-center justify-center">
        <h1 className="text-2xl">Plase login</h1>
      </div>
    </>)
  }

  const moods = await prisma.mood.findMany({
    where: {
      userId: session.user.id
    }
  })

  const formattedMoods = moods.map(mood => ({
    ...mood,
    createdAt: mood.createdAt.toISOString().split('T')[0] // Extracts only the date part
  }));

  const fmoodData: { [key: string]: string } = formattedMoods.reduce((acc: { [key: string]: string }, mood) => {
    acc[mood.createdAt] = mood.mood.toLowerCase(); // Convert mood to lowercase
    return acc;
  }, {});

  console.log(fmoodData);




  return (
    <>
      <Profile moods={fmoodData} />
    </>
  )
}