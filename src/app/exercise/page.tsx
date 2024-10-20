import { auth } from "@/auth";
import Exercises from "./excercise";

export default async function MindfulExcercise() {
  const session = await auth();

  return (<>
    <div>
      <Exercises></Exercises>
    </div>
  </>)
}