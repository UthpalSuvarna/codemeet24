import { SelectForm } from "./moodForm";

export default function Today() {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-white via-blue-100 to-white">
            <div className="border px-8 pt-10 pb-8 rounded-2xl bg-background">
                <div className="text-2xl md:text-4xl font-bold">How are you feeling today?</div>
                <div className="flex justify-center items-center my-2"><SelectForm /></div>
            </div>
        </div>
    );
}