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


      <div className=" w-full min-h-screen  bg-primary gap-0.5 flex flex-wrap justify-center items-center">


          <div className="w-full h-[500px] bg-primary flex flex-row ">

            <div className="w-[50%] h-[500px]">
              <h1 className="text-6xl font-bold ml-10  ">About Us</h1>

              <p className="text-lg mt-4 ml-10 gap-1.5">
                We began DNP 3D to make prototyping simple, fast, and reliable for anyone with an idea—from students and makers to product teams. Today we deliver clean, manufacturable CAD, practical DFM, and precise FDM & Resin prints with careful QA, fast revisions, and friendly support at every step.
              </p>
              
      
            </div>
            <div className="w-[50%] h-[500px] ">
              
              <div className="flex flex-row justify-center items-center ">
                <img src="../assets/images/aboutus1.jpg" alt="About Us" className="w-[400px] h-[300px] object-cover rounded-lg shadow-lg hite " />
              </div>

            </div>
          </div>
        
        


        
        
        
        


      </div>
    </>
  );
}

export default About;
