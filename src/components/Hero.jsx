import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaPlay } from "react-icons/fa";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const words = ["Transform", "Your", "Body."];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85"
          alt="Iron Forge Fitness gym floor"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Multi-layer dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/60 via-transparent to-charcoal-900/40" />

      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          Premium Fitness Facility · Est. 2012
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-4 font-display text-6xl sm:text-8xl md:text-9xl lg:text-[9rem] tracking-wide text-shadow-lg"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-10"
        >
          <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[9rem] tracking-wide gold-text text-shadow">
            Transform Your Life.
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Join Iron Forge Fitness — where elite coaching meets state-of-the-art facilities. 
          Real programs. Real results. No compromises.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("membership")}
            className="btn-primary text-base gap-3 shadow-gold"
          >
            Start Today
            <FaArrowRight className="text-sm" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("contact")}
            className="btn-outline text-base gap-3"
          >
            <FaCalendarAlt className="text-gold-400 text-sm" />
            Book Free Trial
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-white/40 text-xs tracking-widest uppercase"
        >
          {["500+ Members", "15 Elite Trainers", "Since 2012", "Award Winning"].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-500" />
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
