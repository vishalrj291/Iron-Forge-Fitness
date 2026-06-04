import { useRef } from "react";
import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView as useIOInView } from "react-intersection-observer";

const stats = [
  { value: 500, suffix: "+", label: "Active Members", desc: "And growing every month" },
  { value: 15,  suffix: "+", label: "Elite Trainers",  desc: "Certified professionals" },
  { value: 120, suffix: "+", label: "Equipment Pieces", desc: "Premium brands" },
  { value: 1000,suffix: "+", label: "Success Stories",  desc: "Real transformations" },
];
function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return <>{count}</>;
}

function StatCard({ stat, index }) {
  const { ref, inView } = useIOInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card-gold p-8 text-center group cursor-default"
    >
      <div className="mb-2">
       <span className="font-display text-5xl sm:text-6xl gold-text">
          {inView ? (
  <AnimatedNumber value={stat.value} />
) : (
  "0"
)}
          {stat.suffix}
        </span>
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{stat.label}</h3>
      <p className="text-white/40 text-sm">{stat.desc}</p>

      {/* Gold underline on hover */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gold-gradient mx-auto mt-4 transition-all duration-500 rounded-full" />
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=70"
          alt="Gym background"
          className="w-full h-full object-cover opacity-15"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal-900/90" />
      </div>

      <div className="relative container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">By The Numbers</span>
          <h2 className="section-title">
            Results That <span className="gold-text">Speak</span> For Themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
