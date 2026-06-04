import { motion } from "framer-motion";
import {
  FaDumbbell, FaUserTie,
} from "react-icons/fa";
import {
  GiMuscleUp, GiWeightLiftingUp, GiRun,
} from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { programs } from "../data/programs";

const iconMap = {
  FaDumbbell: FaDumbbell,
  GiMuscleUp: GiMuscleUp,
  GiWeightLiftingUp: GiWeightLiftingUp,
  FaUserTie: FaUserTie,
  GiRun: GiRun,
  MdGroups: MdGroups,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Programs() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="programs" className="section-padding bg-charcoal-800">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title mb-4">
            Elite Training <span className="gold-text">Programs</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Scientifically designed programs for every goal. Whether you&apos;re building muscle, 
            losing fat, or improving performance — we have the perfect program for you.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((prog) => {
            const Icon = iconMap[prog.icon];
            return (
              <motion.div
                key={prog.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center shadow-lg`}>
                      {Icon && <Icon className="text-white text-xl" />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-charcoal-700 border border-white/5 border-t-0 rounded-b-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                    {prog.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {prog.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-5">
                    <span className="flex items-center gap-1">
                      <IoTimeOutline className="text-gold-500" /> {prog.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> {prog.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> {prog.sessions}
                    </span>
                  </div>

                  <button
                    onClick={() => handleScroll("contact")}
                    className="flex items-center gap-2 text-gold-400 text-sm font-semibold hover:gap-4 transition-all duration-300 group/btn"
                  >
                    Learn More
                    <BsArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Gold glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/20 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
