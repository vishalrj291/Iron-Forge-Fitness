import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "../data/gallery";
import { FaTimes, FaExpandAlt } from "react-icons/fa";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section-padding bg-charcoal-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Our Facility</span>
          <h2 className="section-title mb-4">
            Inside <span className="gold-text">Iron Forge</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            State-of-the-art equipment, premium facilities, and an environment engineered 
            for peak performance. This is where champions are made.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${img.span}`}
              onClick={() => setLightbox(img)}
            >
              <motion.img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="w-10 h-10 rounded-full bg-gold-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <FaExpandAlt className="text-charcoal-900 text-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={lightbox.url.replace("w=600", "w=1200").replace("w=800", "w=1200")}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white/40 text-sm mt-3">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-charcoal-700 border border-white/10 flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-500 transition-all duration-200"
                aria-label="Close"
              >
                <FaTimes className="text-sm" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
