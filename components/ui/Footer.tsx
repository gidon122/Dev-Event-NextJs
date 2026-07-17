const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-primary/30 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">DevEvent</p>
          <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
            Connecting developers with curated events, meetups, and community opportunities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <a href="/events" className="text-sm text-slate-300 transition hover:text-white">
            Events
          </a>
          <a href="/events/create" className="text-sm text-slate-300 transition hover:text-white">
            Submit event
          </a>
          <a href="#why-de" className="text-sm text-slate-300 transition hover:text-white">
            Why DevEvent
          </a>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} DevEvent. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
