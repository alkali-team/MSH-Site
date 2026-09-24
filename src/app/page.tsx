import Intro from "@/components/home/Intro";
import AiAdvantage from "@/components/home/AiAdvantage";
import AeonHire from "@/components/home/AeonHire";
import Differentiator from "@/components/home/Differentiator";
import WhyMsh from "@/components/home/WhyMsh";

export default function Home() {
  return (
    <main className="flex-1">
      <Intro />
      <AiAdvantage />
      <AeonHire />
      <Differentiator />
      <WhyMsh />
    </main>
  );
}
