import { Code2, Laptop, Sparkles } from "lucide-react";
import ExploreBtn from "@/components/ui/ExploreBtn";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-4 text-center overflow-hidden">
      {/* Floating Tech Icons */}
      <Code2 className="absolute left-12 top-20 hidden h-8 w-8 animate-bounce text-primary md:block" />

      <Laptop className="absolute right-12 top-32 hidden h-8 w-8 animate-pulse text-primary md:block" />

      <Sparkles className="absolute bottom-16 left-1/4 hidden h-6 w-6 animate-ping text-highlight md:block" />

      {/* Small Badge */}
      <div className="mb-16 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
        🚀 Discover • Learn • Build • Network
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        The Hub for Every{" "}
        <span className="text-gradient">
          Developer Event
        </span>{" "}
        You Shouldn&apos;t Miss
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
        Discover hackathons, conferences, meetups, workshops, bootcamps, and
        networking events that help you learn faster, build better, and connect
        with the developer community.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <ExploreBtn />
      </div>
    </section>
  );
}