import Banner from "../components/layout/Banner";

function About() {
  return (
    <>
      <Banner
        title="ABOUT US"
        subtitle="Delivering high-quality 3D printing and digital fabrication solutions tailored to your creative needs"
        breadcrumbs={["Home", "About"]}
        backgroundImage={null}
        icon="rocket" // Options: cube, rocket, star, heart, lightbulb, palette
      />
    </>
  );
}

export default About;
