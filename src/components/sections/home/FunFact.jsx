import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// import CountUp from 'react-countup';

const FunFact = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const stats = [
    { value: 245, suffix: '+', label: 'Satisfied Clients' },
    { value: 782, suffix: '+', label: 'Successful Projects' },
    { value: 94, suffix: '%', label: 'Satisfaction Rate' },
    { value: 20, suffix: '+', label: 'Years of Experience' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-[-%] w-full"
          style={{ y: bgY }}
        >
          <img
            src="assets/images/home/img1.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#0d0f14]/80" />

        {/* Subtle purple vignette on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a46c2]/20 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: heading block */}
        <div className="flex flex-col gap-6">
          <motion.div
            className="flex items-center gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="w-1.5 h-1.5 bg-[#5a46c2]" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-gray-100">
              Fun Fact
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
          >
            Best Choice For Your <br />
            3D Printing Needs
          </motion.h2>

          <motion.p
            className="text-gray-400 text-base leading-relaxed max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            From rapid prototypes to precision end-use parts, our machines run
            around the clock so your ideas never have to wait.
          </motion.p>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2 + index * 0.1}
            >
              <div className="flex items-baseline gap-1.5 leading-none">
                {/* Swap with CountUp once installed */}
                <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                  {stat.value}
                </p>
                <span className="text-3xl font-black text-[#5a46c2] transform group-hover:scale-110 group-hover:text-[#4838a3] transition-all duration-300">
                  {stat.suffix}
                </span>
              </div>

              <p className="text-sm font-medium text-gray-300 tracking-tight mt-4">
                {stat.label}
              </p>

              <div className="w-0 group-hover:w-full h-[2px] bg-[#5a46c2] mt-5 transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FunFact;