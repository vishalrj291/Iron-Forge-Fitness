import { motion } from "framer-motion";
import {
  FaDumbbell, FaInstagram, FaFacebook, FaTwitter, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope,
} from "react-icons/fa";

const footerLinks = {
  "Quick Links": [
    { label: "About Us",   href: "#home" },
    { label: "Programs",   href: "#programs" },
    { label: "Trainers",   href: "#trainers" },
    { label: "Membership", href: "#membership" },
    { label: "Gallery",    href: "#gallery" },
    { label: "Contact",    href: "#contact" },
  ],
  "Programs": [
    { label: "Strength Training",   href: "#programs" },
    { label: "Muscle Building",     href: "#programs" },
    { label: "Weight Loss",         href: "#programs" },
    { label: "Personal Training",   href: "#programs" },
    { label: "Functional Fitness",  href: "#programs" },
    { label: "Group Classes",       href: "#programs" },
  ],
  "Support": [
    { label: "FAQ",              href: "#faq" },
    { label: "Privacy Policy",   href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy",    href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Refer a Friend",   href: "#" },
  ],
};

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebook,  href: "#", label: "Facebook" },
  { icon: FaTwitter,   href: "#", label: "Twitter / X" },
  { icon: FaYoutube,   href: "#", label: "YouTube" },
];

export default function Footer() {
  const handleScroll = (href) => {
    if (href === "#") return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal-900 border-t border-white/5">
      {/* CTA Banner */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=70"
            alt="Gym background"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal-900/80" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-6xl tracking-wide mb-4">
              Ready to <span className="gold-text">Forge</span> Your Future?
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Join 500+ members already transforming their bodies and their lives at Iron Forge Fitness.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll("#membership")}
              className="btn-primary text-base"
            >
              Start Your Free Trial Today
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center">
                <FaDumbbell className="text-charcoal-900 text-lg" />
              </div>
              <div>
                <div className="font-display text-2xl tracking-widest gold-text">IRON FORGE</div>
                <div className="text-[10px] tracking-[0.4em] text-white/30 uppercase">FITNESS</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Sydney&apos;s premier strength and conditioning facility. We build champions — from the 
              first-timer to the elite athlete.
            </p>

            {/* Contact mini */}
            <div className="flex flex-col gap-2 text-sm text-white/40 mb-6">
              <a href="https://maps.google.com/?q=42+King+Street+Sydney" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <FaMapMarkerAlt className="text-gold-500/60 text-xs" />
                42 King Street, Sydney CBD NSW 2000
              </a>
              <a href="tel:+61291234567" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <FaPhone className="text-gold-500/60 text-xs" />
                +61 2 9123 4567
              </a>
              <a href="mailto:hello@ironforgefitness.com.au" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <FaEnvelope className="text-gold-500/60 text-xs" />
                hello@ironforgefitness.com.au
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, color: "#f59e0b" }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:border-gold-500/30 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
                      className="text-white/40 hover:text-gold-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Iron Forge Fitness Pty Ltd. All rights reserved. ABN 12 345 678 901
          </p>
          <div className="flex gap-4 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/50 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
