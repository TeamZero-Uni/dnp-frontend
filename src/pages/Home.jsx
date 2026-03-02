import FeedbackSection from "./home/FeedbackSection"
import Hero from "./home/Hero"
import ReadyToStart from "../components/ReadyToStart"
import ServiceSection from "./home/ServiceSection"
import ProductSection from "./home/ProductSection"
import HowItWorks from "./home/HowItWorks"

export default function Home() {
  return (
    <div className="bg-[#f9f8ff]">
      <Hero />
      <ServiceSection />
      <ProductSection />
      <HowItWorks />
      <FeedbackSection />
      <ReadyToStart />
    </div>
  )
}