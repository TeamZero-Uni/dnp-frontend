import React from 'react';

export default function ReadyToStart() {
  return (
    <section className="relative mx-[6%] mt-5 mb-5 overflow-hidden rounded-3xl bg-linear-to-br from-[#dbeafe] via-[#eff6ff] to-[#e0f2fe] py-20 text-center">
      
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#5a46c2]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-[#4838a3]/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-40 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5a46c2]/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6">
        
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5a46c2]/25 bg-[#5a46c2]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#4838a3] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5a46c2]" />
          Manufacturing Solutions
        </div>

        <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
          Ready to Start <br />
          <span className="text-[#5a46c2]">Your Project?</span>
        </h2>

        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-500">
          Get an instant quote for your manufacturing needs — fast, accurate, and tailored to you.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className="group flex items-center gap-2 rounded-xl  px-8 py-4 text-base font-bold btn-color shadow-[0_8px_24px_rgba(90,70,194,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(90,70,194,0.45)]"
          >
            Request Quote
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            className="rounded-xl border-[1.5px] border-[#5a46c2]/30 bg-[#5a46c2]/10 px-8 py-4 text-base font-semibold text-[#4838a3] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5a46c2]/15"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}