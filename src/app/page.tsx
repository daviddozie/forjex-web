import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/home/hero";
import { WorkFlow } from "@/components/home/workflow";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WorkFlow />
      <Footer />
    </div>
  );
}
