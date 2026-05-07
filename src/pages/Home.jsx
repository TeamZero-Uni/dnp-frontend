import Hero from "../components/sections/home/Hero"
import ReadyToStart from "../components/ReadyToStart"
import ServiceSection from "../components/sections/home/ServiceSection"
import ProductSection from "../components/sections/home/ProductSection"
import HowItWorks from "../components/sections/home/HowItWorks"
import FeedbackSection from "../components/sections/home/FeedbackSection"
import AboutSection from "../components/sections/home/AboutSection"
import WhoWeAre from "../components/sections/home/WhoWeAre"
import OurWork from "../components/sections/home/OurWork"
import IlluminatedSigns from "../components/sections/home/IlluminatedSigns"
import FunFact from "../components/sections/home/FunFact"

export default function Home() {
  return (
    <div>
      <Hero />           
      <WhoWeAre />       
      <FunFact />        
      <ServiceSection /> 
      <ProductSection /> 
      <IlluminatedSigns />
      <HowItWorks />     
      <OurWork />        
      <AboutSection />   
      <FeedbackSection />
      <ReadyToStart /> 
    </div>
  )
}