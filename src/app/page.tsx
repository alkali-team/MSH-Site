import Intro from "@/components/home/Intro";
import AiAdvantage from "@/components/home/AiAdvantage";
import AeonHire from "@/components/home/AeonHire";

export default function Home() {
  return (
    <main className="flex-1">
      <Intro />
      <AiAdvantage />
      <AeonHire />
    </main>
  );
}
