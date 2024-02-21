import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Business from "@/components/Business";
import FooterSection from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Business/>
      <FooterSection/>
    </main>
  );
}
