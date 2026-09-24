import Intro from "@/components/home/Intro";
import AiAdvantage from "@/components/home/AiAdvantage";
import AeonHire from "@/components/home/AeonHire";
import Differentiator from "@/components/home/Differentiator";
import WhyMsh from "@/components/home/WhyMsh";
import Distinguished from "@/components/home/Distinguished";
import Impact from "@/components/home/Impact";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <Intro />
      <AiAdvantage />
      <AeonHire />
      <Differentiator />
      <WhyMsh />
      <Distinguished />
      <Impact />
      <Testimonials />
    </main>
  );
}
