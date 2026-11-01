import Hero from "@/components/ui/Hero";
import FeaturedEvent from "@/components/ui/featuredEvent";
import WhyDe from "@/components/ui/WhyDe";
import Stats from "@/components/ui/Stats";
import { parseEventQuery } from "@/features/events";
import { listEvents } from "@/features/events/service.server";

const Page = async () => {
  const { items } = await listEvents(parseEventQuery({ limit: "3" }));

  return (
    <section>
      <Hero />
      
      <FeaturedEvent events={items} />
      <WhyDe />
      <Stats />
    </section>
  );
};

export default Page;