import { Code2, Laptop, Sparkles } from "lucide-react";
import ExploreBtn from "@/components/ui/ExploreBtn";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      {/* Floating Tech Icons */}
      <Code2 className="absolute left-12 top-20 h-8 w-8 text-indigo-300 animate-bounce hidden md:block" />

      <Laptop className="absolute right-12 top-32 h-8 w-8 text-violet-300 animate-pulse hidden md:block" />

      <Sparkles className="absolute bottom-16 left-1/4 h-6 w-6 text-cyan-300 animate-ping hidden md:block" />

      {/* Small Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur">
        🚀 Discover • Learn • Build • Network
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
        The Hub for Every{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Developer Event
        </span>{" "}
        You Shouldn&apos;t Miss
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
        Discover hackathons, conferences, meetups, workshops, bootcamps, and
        networking events that help you learn faster, build better, and connect
        with the developer community.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <ExploreBtn />
      </div>

      {/* Tech Tags */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {[
          "⚛ React",
          "▲ Next.js",
          "🐍 Python",
          "☁ Cloud",
          "🤖 AI",
          "🏆 Hackathons",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}