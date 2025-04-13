import { Typewriter } from "nextjs-simple-typewriter";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-start min-h-screen px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl xl:text-[150px] font-bold flex flex-col lg:flex-row">
          <h1>Sergio</h1>
          <h1 className="lg:ml-3">Brancato</h1>
        </div>
      </div>
      {/* Typewriter effect */}
      <div className="text-3xl sm:text-4xl md:text-5xl mt-4 gradient-text">
        <Typewriter
          words={["Coding", "Marketing", "Design"]}
          typeSpeed={150}
          cursor
          loop={0}
          cursorBlinking
          delaySpeed={500}
        />
      </div>
    </div>
  );
}
