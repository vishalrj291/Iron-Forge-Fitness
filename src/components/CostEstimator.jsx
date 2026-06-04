import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalculator, FaTag } from "react-icons/fa";

const PLANS = [
  { id: "basic",   name: "Basic",  price: 49 },
  { id: "pro",     name: "Pro",    price: 89 },
  { id: "elite",   name: "Elite",  price: 149 },
];

const ADDONS = [
  { id: "pt",        name: "Extra PT Session (x4)",     price: 60 },
  { id: "nutrition", name: "Nutrition Consultation",    price: 45 },
  { id: "sauna",     name: "Sauna Pass (monthly)",      price: 20 },
];

function Discount(months) {
  if (months >= 12) return { pct: 20, label: "Annual commitment — 20% off" };
  if (months >= 6)  return { pct: 10, label: "6-month commitment — 10% off" };
  if (months >= 3)  return { pct:  5, label: "3-month commitment — 5% off" };
  return { pct: 0, label: null };
}

export default function CostEstimator() {
  const [planId,   setPlanId]   = useState("pro");
  const [months,   setMonths]   = useState(1);
  const [addons,   setAddons]   = useState([]);

  const plan     = PLANS.find((p) => p.id === planId);
  const discount = Discount(months);

  const { baseTotal, addonTotal, discountAmt, finalTotal } = useMemo(() => {
    const base   = plan.price * months;
    const addon  = addons.reduce((sum, id) => {
      const a = ADDONS.find((a) => a.id === id);
      return sum + (a ? a.price * months : 0);
    }, 0);
    const total  = base + addon;
    const disc   = Math.round(total * (discount.pct / 100));
    return { baseTotal: base, addonTotal: addon, discountAmt: disc, finalTotal: total - disc };
  }, [planId, months, addons, plan.price, discount.pct]);

  const toggleAddon = (id) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-charcoal-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Plan Your Investment</span>
          <h2 className="section-title mb-4">
            Membership <span className="gold-text">Cost Estimator</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            See exactly what you&apos;ll pay — including any add-ons and commitment discounts. 
            No surprises, ever.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Plan selector */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-3 uppercase tracking-widest">
                Choose Plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={`p-4 rounded-xl border text-sm font-bold transition-all duration-200 ${
                      planId === p.id
                        ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                        : "border-white/10 bg-charcoal-700 text-white/50 hover:border-white/25"
                    }`}
                  >
                    <div>{p.name}</div>
                    <div className="text-xs font-normal mt-1 opacity-70">${p.price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration slider */}
            <div>
              <label className="flex items-center justify-between text-sm text-white/60 font-medium mb-3 uppercase tracking-widest">
                <span>Duration</span>
                <span className="text-gold-400 font-bold text-base normal-case tracking-normal">
                  {months} month{months > 1 ? "s" : ""}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={12}
                value={months}
                onChange={(e) => setMonths(+e.target.value)}
                className="w-full accent-yellow-500 cursor-pointer"
                style={{ accentColor: "#f59e0b" }}
              />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>1 mo</span>
                <span>3 mo</span>
                <span>6 mo</span>
                <span>12 mo</span>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-3 uppercase tracking-widest">
                Add-Ons (Optional)
              </label>
              <div className="flex flex-col gap-2">
                {ADDONS.map((addon) => (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      addons.includes(addon.id)
                        ? "border-gold-500/40 bg-gold-500/5"
                        : "border-white/10 bg-charcoal-700 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-200 ${
                          addons.includes(addon.id)
                            ? "bg-gold-500 border-gold-500"
                            : "border-white/20"
                        }`}
                      >
                        {addons.includes(addon.id) && (
                          <svg className="w-3 h-3 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={addons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <span className="text-sm text-white/70">{addon.name}</span>
                    </div>
                    <span className="text-gold-400 font-semibold text-sm">+${addon.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-gold p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaCalculator className="text-gold-400 text-lg" />
                <h3 className="text-lg font-bold text-white">Cost Summary</h3>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">{plan.name} Plan × {months} month{months > 1 ? "s" : ""}</span>
                  <span className="text-white">${baseTotal}</span>
                </div>

                {addons.map((id) => {
                  const a = ADDONS.find((a) => a.id === id);
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-white/50">{a.name} × {months} mo</span>
                      <span className="text-white">+${a.price * months}</span>
                    </div>
                  );
                })}

                <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">${baseTotal + addonTotal}</span>
                </div>

                <AnimatePresence>
                  {discount.pct > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between text-sm overflow-hidden"
                    >
                      <span className="flex items-center gap-1.5 text-green-400">
                        <FaTag className="text-xs" />
                        {discount.label}
                      </span>
                      <span className="text-green-400 font-semibold">-${discountAmt}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total */}
              <div className="p-5 rounded-xl bg-charcoal-700 border border-gold-500/20 mb-6">
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Total Cost</div>
                <motion.div
                  key={finalTotal}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-5xl gold-text"
                >
                  ${finalTotal}
                </motion.div>
                <div className="text-white/40 text-xs mt-1">
                  ≈ ${Math.round(finalTotal / months)}/month average
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll("contact")}
              className="btn-primary w-full"
            >
              Claim This Price — Join Now
            </motion.button>
            <p className="text-center text-white/30 text-xs mt-3">
              Price locked in when you sign up today
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
