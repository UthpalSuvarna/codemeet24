import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-screen text-center bg-background text-foreground overflow-hidden">
        <div className="max-w-4xl p-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to{" "}
            <span className="text-primary">
              WellNest
            </span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
            Your one-stop solution for all your <span className="text-primary">meatal health and wellness needs.</span>
          </p>
          <div className="mt-6">
          </div>
        </div>
      </div>
    </>
  );
}
