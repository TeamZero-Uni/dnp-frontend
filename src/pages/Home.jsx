import FeedbackSection from "./home/FeedbackSection"
import Hero from "./home/Hero"
import ReadyToStart from "./home/ReadyToStart"
import ServiceSection from "./home/ServiceSection"
import ProductSection from "./home/ProductSection"

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <ProductSection />
      <FeedbackSection />
      <ReadyToStart />
    </>
  )
}
