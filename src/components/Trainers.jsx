import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin, FaStar, FaUsers } from "react-icons/fa";
import { trainers } from "../data/trainers";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Trainers() {
  return (
    <section id="trainers" className="section-padding bg-charcoal-900">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Meet The Team</span>
          <h2 className="section-title mb-4">
            World-Class <span className="gold-text">Coaches</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Our elite team of certified coaches brings decades of combined experience to guide 
            your transformation with precision, accountability, and passion.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-charcoal-800 border border-white/5 cursor-pointer"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-transparent" />

                {/* Social overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-charcoal-900/70 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {[
                    { icon: FaInstagram, href: trainer.instagram },
                    { icon: FaTwitter, href: trainer.twitter },
                    { icon: FaLinkedin, href: trainer.linkedin },
                  ].map(({ icon: Icon, href }, i) => (
                    <motion.a
                      key={i}
                      href={href}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.2, color: "#f59e0b" }}
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon className="text-base" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-lg group-hover:text-gold-400 transition-colors duration-300">
                    {trainer.name}
                  </h3>
                </div>
                <p className="text-gold-400 text-xs font-semibold tracking-wide uppercase mb-3">
                  {trainer.role}
                </p>

                <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-3">
                  {trainer.bio}
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1 text-white/50">
                    <FaUsers className="text-gold-500" />
                    <span>{trainer.clients}+ clients</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/50">
                    {Array.from({ length: trainer.rating }).map((_, i) => (
                      <FaStar key={i} className="text-gold-400 text-[10px]" />
                    ))}
                  </div>
                  <div className="text-white/50">
                    {trainer.experience}
                  </div>
                </div>

                {/* Certs */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
