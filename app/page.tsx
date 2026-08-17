import Navbar from "@/components/PortfolioTemplate-text-5/Navbar";
import Hero from "@/components/PortfolioTemplate-text-5/Hero";
import AboutUs from "@/components/PortfolioTemplate-text-5/AboutUs";
import OurServices from "@/components/PortfolioTemplate-text-5/OurServices";
import MyProjects from "@/components/PortfolioTemplate-text-5/MyProjects";
import ContactMe from "@/components/PortfolioTemplate-text-5/ContactMe";
import Qualification from "@/components/PortfolioTemplate-text-5/qualification";
import Footer from "@/components/PortfolioTemplate-text-5/Footer";

export default function Home() {
  return (
    <div className="bg-[#030712] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <section id="Hero" className="min-h-screen">
        <Hero />
      </section>

      <section id="AboutUs" className="min-h-screen">
        <AboutUs />
      </section>

      <section id="Qualification" className="min-h-screen">
        <Qualification />
      </section>
      
      <section id="OurServices" className="min-h-screen">
        <OurServices />
      </section>
      
      <section id="MyProjects" className="min-h-screen">
        <MyProjects />
      </section>

      <section id="ContactMe" className="min-h-screen">
        <ContactMe />
      </section>
      
      <Footer />
    </div>
  );
}
