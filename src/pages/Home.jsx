import Hero from "../components/sections/home/Hero"
import ReadyToStart from "../components/ReadyToStart"
import ServiceSection from "../components/sections/home/ServiceSection"
import ProductSection from "../components/sections/home/ProductSection"
import HowItWorks from "../components/sections/home/HowItWorks"
import FeedbackSection from "../components/sections/home/FeedbackSection"
import AboutSection from "../components/sections/home/AboutSection"

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <AboutSection />
      <ProductSection />
      <HowItWorks />
      <FeedbackSection />
      <ReadyToStart />
    </div>
  )
}