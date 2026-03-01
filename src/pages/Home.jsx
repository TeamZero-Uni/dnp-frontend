import FeedbackSection from "./home/FeedbackSection"
import Hero from "./home/Hero"
import ReadyToStart from "../components/ReadyToStart"
import ServiceSection from "./home/ServiceSection"
import ProductSection from "./home/ProductSection"

export default function Home() {
  return (
    /* Applying the background color and a subtle linear gradient */
    <div className="bg-[#f9f8ff]">
      <Hero />
      <ServiceSection />
      <ProductSection />
      <FeedbackSection />
      <ReadyToStart />
    </div>
  )
}