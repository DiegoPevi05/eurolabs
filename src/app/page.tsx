import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Business from "@/components/Business";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Business/>
    </main>
  );
}
