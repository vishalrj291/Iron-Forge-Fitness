import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const BEFORE_IMG = "https://images.unsplash.com/photo-1609899537878-48826f634e87?w=900&q=80";
const AFTER_IMG  = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80";

const transformations = [
  { name: "James Whitfield", lost: "24kg", duration: "6 Months", program: "Body Recomposition" },
  { name: "Ryan O'Brien",    lost: "17kg", duration: "5 Months", program: "Fat Loss + Strength" },
  { name: "Priya Menon",     lost: "14kg", duration: "4 Months", program: "Nutrition + HIIT" },
];

export default function Transformation() {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging]   = useState(false);
  const [active, setActive]       = useState(0);
  const containerRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect  = containerRef.current.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(ratio, 2), 98));
  }, []);

  const onMouseDown = (e) => { setDragging(true); updateSlider(e.clientX); };
  const onMouseMove = useCallback((e) => { if (dragging) updateSlider(e.clientX); }, [dragging, updateSlider]);
  const onMouseUp   = () => setDragging(false);

  const onTouchStart = (e) => { setDragging(true); updateSlider(e.touches[0].clientX); };
  const onTouchMove  = useCallback((e) => { if (dragging) updateSlider(e.touches[0].clientX); }, [dragging, updateSlider]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend",  onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onMouseUp);
    };
  }, [onMouseMove, onTouchMove]);

  return (
    <section className="section-padding bg-charcoal-800 overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Real Results</span>
          <h2 className="section-title mb-4">
            Proven <span className="gold-text">Transformations</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Drag the slider to see real before & after results from our members. 
            These are genuine transformations — no filters, no tricks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              ref={containerRef}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden select-none border border-white/10 shadow-2xl ${dragging ? "cursor-ew-resize" : "cursor-ew-resize"}`}
            >
              {/* After (right) */}
              <img
                src={AFTER_IMG}
                alt="After transformation"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* Before (left, clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={BEFORE_IMG}
                  alt="Before transformation"
                  className="absolute inset-0 h-full object-cover"
                  style={{ width: `${containerRef.current?.offsetWidth || 600}px` }}
                  draggable={false}
                />
                {/* Before label */}
                <span className="absolute top-4 left-4 bg-charcoal-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 tracking-widest uppercase">
                  Before
                </span>
              </div>

              {/* After label */}
              <span className="absolute top-4 right-4 bg-gold-500/90 backdrop-blur-sm text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                After
              </span>

              {/* Divider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              />

              {/* Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-4 border-gold-400 flex items-center justify-center z-10 hover:scale-110 transition-transform"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%) translateY(-50%)" }}
              >
                <div className="flex gap-0.5">
                  <span className="block w-0.5 h-4 bg-charcoal-700 rounded" />
                  <span className="block w-0.5 h-4 bg-charcoal-700 rounded" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transformation cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold mb-2">
              Real Members, <span className="gold-text">Real Results</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Our clients achieve incredible transformations through our science-backed programs, 
              elite coaching, and a community that holds you accountable every step of the way.
            </p>

            {transformations.map((t, i) => (
              <motion.button
                key={t.name}
                whileHover={{ x: 6 }}
                onClick={() => setActive(i)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                  active === i
                    ? "border-gold-500/50 bg-gold-500/5"
                    : "border-white/5 bg-charcoal-700 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold ${active === i ? "text-gold-400" : "text-white"}`}>
                    {t.name}
                  </span>
                  {active === i && (
                    <span className="text-xs bg-gold-500 text-charcoal-900 font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span className="text-gold-400 font-bold">{t.lost} lost</span>
                  <span>·</span>
                  <span>{t.duration}</span>
                  <span>·</span>
                  <span>{t.program}</span>
                </div>
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-2 p-5 rounded-xl bg-charcoal-700 border border-white/5"
            >
              <p className="text-white/60 text-sm italic leading-relaxed">
                "Iron Forge doesn't just change bodies — it changes mindsets. The level of 
                coaching and accountability I experienced here was unlike anything I'd tried before."
              </p>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80"
                  alt="James"
                  className="w-8 h-8 rounded-full object-cover border border-gold-500/30"
                />
                <span className="text-gold-400 text-sm font-semibold">James Whitfield</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
