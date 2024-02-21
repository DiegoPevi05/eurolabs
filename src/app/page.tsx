import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Business from "@/components/Business";
import FooterSection from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <Business/>
      <FooterSection/>
    </main>
  );
}
