import Hero from "@/components/ui/Hero";
import FeaturedEvent from "@/components/ui/featuredEvent";
import WhyDe from "@/components/ui/WhyDe";
import Stats from "@/components/ui/Stats";
import Create from "@/components/ui/Create";

const Page = () => {
  return (
    <section>
      <Hero />
      
      <FeaturedEvent />
      <WhyDe />
      <Stats />
      <Create />
    </section>
  );
};

export default Page;