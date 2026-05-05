import {
  FaWhatsapp, FaFacebookMessenger, FaEnvelope,
  FaPhone, FaTiktok,
} from "react-icons/fa6";

const contactMethods = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    sub: "+94 77 150 9562",
    href: "https://wa.me/94771509562?text=Hi%2C%20I%20have%20a%20custom%20request%20I%27d%20like%20to%20discuss.",
    icon: FaWhatsapp,
    color: "#25D366",
    external: true,
  },
  {
    id: "messenger",
    label: "Messenger",
    sub: "DNP 3D",
    href: "https://www.facebook.com/share/1Q2HCMGWff/?mibextid=wwXIfr",
    icon: FaFacebookMessenger,
    color: "#0099FF",
    external: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    sub: "@dnp3d",
    href: "https://www.tiktok.com/@dnp3d",
    icon: FaTiktok,
    color: "#010101",
    external: true,
  },
  null,
  {
    id: "email",
    label: "Email",
    sub: "dnpeco@gmail.com",
    // Gmail web compose URL — opens Gmail directly with To pre-filled
    href: "https://mail.google.com/mail/?view=cm&to=dnpeco@gmail.com&su=Custom%20Request&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20make%20a%20custom%20request%20for%3A%0A%0A%5BDescribe%20your%20request%20here%5D%0A%0AThank%20you!",
    icon: FaEnvelope,
    color: "#EA4335",
    external: true, // changed to true so it opens in new tab
  },
  {
    id: "call",
    label: "Call us",
    sub: "+94 77 150 9562",
    href: "tel:+94771509562",
    icon: FaPhone,
    color: "#34B7F1",
    external: false,
  },
];

const ContactUs = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-[13px] font-medium text-slate-900">Contact us</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Choose your preferred way to reach us</p>
      </div>

      <div className="p-2">
        {contactMethods.map((method, i) =>
          method === null ? (
            <div key={i} className="h-px bg-slate-100 my-1 mx-2" />
          ) : (
            <a
              key={method.id}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noreferrer" : undefined}
              className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${method.color}15` }}
              >
                <method.icon size={14} style={{ color: method.color }} />
              </span>

              <span className="flex-1 min-w-0">
                <span className="block text-[12px] font-medium text-slate-800">{method.label}</span>
                <span className="block text-[11px] text-slate-400 truncate">{method.sub}</span>
              </span>

              {method.external && (
                <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round"/>
                </svg>
              )}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default ContactUs;