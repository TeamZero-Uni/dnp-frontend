import React, { useState } from "react";
import {
  FaWhatsapp, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaPaperPlane, FaUser, FaCommentDots, FaChevronRight
} from "react-icons/fa";
import Banner from "../components/layout/Banner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent]   = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      <Banner
        path="Contact"
        title={<>Get In Touch With<br /><span className="text-[#5a46c2]">Our Studio</span></>}
        description="Have a question about 3D printing or need a custom quote? Reach out — we'd love to hear from you."
        tagLine="We're Here to Help"
        imageUrl={null}
        buttonText="Scroll Down"
        buttonLink="#contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        <div className="lg:col-span-2 flex flex-col gap-5">

          <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">Contact Info</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Multiple ways to reach us</p>
            </div>

            <div className="divide-y divide-slate-50">
              {[
                {
                  icon: <FaPhoneAlt size={15}/>,
                  label: "Phone",
                  value: "+94 77 123 4567",
                  href: "tel:+94771234567",
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                  border: "border-violet-100",
                },
                {
                  icon: <FaWhatsapp size={15}/>,
                  label: "WhatsApp",
                  value: "+94 77 123 4567",
                  href: "https://wa.me/94771234567",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                  border: "border-emerald-100",
                },
                {
                  icon: <FaEnvelope size={15}/>,
                  label: "Email",
                  value: "hello@studio3d.lk",
                  href: "mailto:hello@studio3d.lk",
                  color: "text-sky-600",
                  bg: "bg-sky-50",
                  border: "border-sky-100",
                },
                {
                  icon: <FaFacebookF size={15}/>,
                  label: "Facebook",
                  value: "Studio3D Sri Lanka",
                  href: "https://facebook.com",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  border: "border-blue-100",
                },
              ].map(({ icon, label, value, href, color, bg, border }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 px-5 py-4 hover:bg-violet-50/40 transition-colors group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color} border ${border}`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-violet-700 transition-colors">{value}</p>
                  </div>
                  <FaChevronRight size={10} className="text-slate-300 group-hover:text-violet-400 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-violet-100 px-5 py-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
              <FaMapMarkerAlt size={15}/>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Our Location</p>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                123 Innovation Drive,<br />Colombo 03, Sri Lanka
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-800 mt-2 transition-colors">
                Open in Maps <FaChevronRight size={8}/>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">
            <div className="w-full h-52 bg-violet-50 relative">
              <iframe
                title="location"
                className="w-full h-full"
                style={{ border: 0, filter:"hue-rotate(230deg) saturate(0.7) brightness(0.95)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d36990.79091398724!2d80.54256617995446!3d6.06176998747778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2slk!4v1773219331028!5m2!1sen!2slk"
              />
              <div className="absolute top-3 left-3 bg-white border border-violet-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-xs font-bold text-violet-700">Colombo, SL</span>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 leading-none">Send Us a Message</h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">We'll get back to you within 24 hours</p>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  <FaPaperPlane size={26} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Message Sent!</h3>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
                  Thanks for reaching out. We'll reply to <span className="font-bold text-slate-600">{form.email}</span> shortly.
                </p>
                <button onClick={() => setSent(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                  style={{ background:"linear-gradient(135deg,#5a46c2,#4838a3)" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <FaUser size={9} className="text-violet-500"/> Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <FaEnvelope size={9} className="text-violet-500"/> Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <FaPhoneAlt size={9} className="text-violet-500"/> Phone
                    <span className="text-slate-300 font-normal normal-case tracking-normal ml-1">optional</span>
                  </label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+94 77 000 0000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <FaCommentDots size={9} className="text-violet-500"/> Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="subject" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:bg-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic...</option>
                    <option>3D Printing Quote</option>
                    <option>Custom Model Design</option>
                    <option>Order Inquiry</option>
                    <option>General Question</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <FaCommentDots size={9} className="text-violet-500"/> Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Describe your project or question in detail..."
                    className="w-full resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-1.5 text-right">{form.message.length} / 500</p>
                </div>

                <div className="sm:col-span-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                    By submitting you agree to our <a href="#" className="text-violet-500 font-semibold hover:underline">privacy policy</a>.
                  </p>
                  <button type="submit"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 shrink-0"
                    style={{ background:"linear-gradient(135deg,#5a46c2,#4838a3)", boxShadow:"0 6px 20px rgba(90,70,194,.35)" }}>
                    <FaPaperPlane size={13}/>
                    Send Message
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}