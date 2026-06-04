import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  const go = useCallback((dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  }, [total]);

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [go]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:  (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.4 } }),
  };

  const t = testimonials[current];

  return (
    <section className="section-padding bg-charcoal-800 overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Member Stories</span>
          <h2 className="section-title mb-4">
            What Our <span className="gold-text">Members</span> Say
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main card */}
          <div className="relative overflow-hidden rounded-2xl min-h-[380px] sm:min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10 glass-card"
              >
                {/* Photo + info */}
                <div className="flex flex-col items-center shrink-0 text-center">
                  <div className="relative mb-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-gold-500/40"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                      <FaQuoteLeft className="text-charcoal-900 text-xs" />
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-base">{t.name}</h4>
                  <p className="text-gold-400 text-xs">{t.role}</p>
                  <p className="text-white/40 text-xs">{t.location}</p>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} className="text-gold-400 text-xs" />
                    ))}
                  </div>

                  {/* Stats pills */}
                  {t.before !== "N/A" && (
                    <div className="flex gap-2 mt-3">
                      <div className="text-center px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                        <div className="text-[10px] text-red-400/60">Before</div>
                        <div className="text-xs font-bold text-red-400">{t.before}</div>
                      </div>
                      <div className="text-center px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                        <div className="text-[10px] text-green-400/60">After</div>
                        <div className="text-xs font-bold text-green-400">{t.after}</div>
                      </div>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-white/30">{t.duration}</div>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-sm" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2.5 bg-gold-500"
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-400 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-sm" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
