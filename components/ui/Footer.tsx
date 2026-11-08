import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-background text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">EventLoop</p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Connecting developers with curated events, meetups, and community opportunities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/event" className="text-sm transition hover:text-foreground">
            Events
          </Link>
          <a href="/events/create" className="text-sm transition hover:text-foreground">
            Submit event
          </a>
          <a href="#why-de" className="text-sm transition hover:text-foreground">
            Why EventLoop
          </a>
        </div>

        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} EventLoop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
