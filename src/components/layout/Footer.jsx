import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaYoutube, 
  FaTiktok, 
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {
  const services = [
    { name: "3D Printing", path: "/service/3d-printing" },
    { name: "3D Resin Printing", path: "/service/resin-printing" },
    { name: "3D Modeling", path: "/service/3d-modeling" },
    { name: "Laser Engraving", path: "/service/laser-engraving" },
    { name: "PCB CNC", path: "/service/pcb-cnc" },
    { name: "Injection Molding", path: "/service/injection-molding" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Our Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com", color: "hover:bg-[#1877F2]", label: "Facebook" },
    { icon: <FaYoutube />, url: "https://youtube.com", color: "hover:bg-[#FF0000]", label: "YouTube" },
    { icon: <FaTiktok />, url: "https://tiktok.com", color: "hover:bg-black", label: "TikTok" },
    { icon: <FaWhatsapp />, url: "https://wa.me/yournumber", color: "hover:bg-[#25D366]", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-secondary text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-1.5 group">
              <div className="p-1 group-hover:rotate-12 transition-transform duration-300">
                <img
                  src="/assets/images/logo.png"
                  alt="DNP 3D Logo"
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  DNP <span className="text-[#5a46c2]">3D</span>
                </span>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  Hobby Lobby
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Delivering high-quality 3D printing and digital fabrication solutions tailored to your creative needs. 
              Let's bring your ideas to life.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-200 transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-lg ${social.color} hover:border-transparent`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-5 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#5a46c2] -mb-2"></span>
            </h3>
            <ul className="space-y-3 mt-7">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-[#5a46c2] transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#5a46c2] group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-5 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#5a46c2] -mb-2"></span>
            </h3>
            <ul className="space-y-3 mt-7">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-gray-300 hover:text-[#5a46c2] transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#5a46c2] group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-5 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#5a46c2] -mb-2"></span>
            </h3>
            <ul className="space-y-5 mt-7">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 text-[#5a46c2] bg-[#5a46c2]/10 p-2 rounded-lg group-hover:bg-[#5a46c2]/20 transition-colors">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <a 
                    href="tel:+123456789" 
                    className="text-gray-300 hover:text-[#5a46c2] transition-colors text-sm"
                  >
                    +123 456 7890
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group">
                <div className="mt-1 text-[#5a46c2] bg-[#5a46c2]/10 p-2 rounded-lg group-hover:bg-[#5a46c2]/20 transition-colors">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <a 
                    href="mailto:hello@dnp3d.com" 
                    className="text-gray-300 hover:text-[#5a46c2] transition-colors text-sm break-all"
                  >
                    hello@dnp3d.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group">
                <div className="mt-1 text-[#5a46c2] bg-[#5a46c2]/10 p-2 rounded-lg group-hover:bg-[#5a46c2]/20 transition-colors">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    123 Business Avenue,<br />
                    City Center, NY 10001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#04011a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} DNP 3D Hobby Lobby. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link 
                to="/terms" 
                className="hover:text-[#5a46c2] transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span className="text-gray-700">|</span>
              <Link 
                to="/privacy" 
                className="hover:text-[#5a46c2] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;