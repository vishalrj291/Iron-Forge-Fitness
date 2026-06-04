import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen((prev) => (prev === id ? null : id));

  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Got Questions?</span>
          <h2 className="section-title mb-4">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Everything you need to know before joining. Can&apos;t find your answer? 
            Reach out — we&apos;re happy to help.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                open === faq.id
                  ? "border-gold-500/30 bg-gold-500/5"
                  : "border-white/5 bg-charcoal-700 hover:border-white/15"
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                aria-expanded={open === faq.id}
              >
                <span className={`font-semibold text-base transition-colors duration-200 ${
                  open === faq.id ? "text-gold-400" : "text-white group-hover:text-gold-400"
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: open === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    open === faq.id
                      ? "bg-gold-500 text-charcoal-900"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  <FaChevronDown className="text-xs" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
