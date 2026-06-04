import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCrown, FaStar } from "react-icons/fa";
import { HiOutlineBolt } from "react-icons/hi2";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    period: "/mo",
    badge: null,
    icon: <HiOutlineBolt className="text-2xl" />,
    color: "border-white/10",
    buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    features: [
      "Full gym access (6 AM – 10 PM)",
      "Access to all cardio equipment",
      "Standard locker access",
      "Group class access (2x/week)",
      "Fitness assessment (1x/year)",
      "Mobile app access",
    ],
    missing: [
      "24/7 access",
      "Personal training sessions",
      "Nutrition consultation",
      "Guest passes",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 89,
    period: "/mo",
    badge: "Most Popular",
    icon: <FaStar className="text-2xl" />,
    color: "border-gold-500/50",
    buttonClass: "bg-gold-gradient text-charcoal-900 font-bold",
    features: [
      "Full gym access (5 AM – 11 PM)",
      "Unlimited group classes",
      "24/7 keycard access",
      "Premium locker + towel service",
      "2 PT sessions per month",
      "Monthly fitness assessment",
      "Nutrition workshop access",
      "2 guest passes per month",
      "Mobile app + workout plans",
    ],
    missing: ["Dedicated coach", "4 PT sessions/month"],
  },
  {
    id: "elite",
    name: "Elite",
    price: 149,
    period: "/mo",
    badge: "Best Value",
    icon: <FaCrown className="text-2xl" />,
    color: "border-white/10",
    buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    features: [
      "24/7 unlimited access",
      "Unlimited group classes",
      "4 PT sessions per month",
      "Monthly nutrition consultation",
      "Dedicated personal coach",
      "Premium locker + towel service",
      "Sauna & recovery zone access",
      "5 guest passes per month",
      "Quarterly body composition scan",
      "Priority class booking",
      "Supplement discount (15%)",
    ],
    missing: [],
  },
];

export default function Membership() {
  const [billing, setBilling] = useState("monthly");
  const discount = billing === "annual" ? 0.15 : 0;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="membership" className="section-padding bg-charcoal-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Membership Plans</span>
          <h2 className="section-title mb-4">
            Simple, <span className="gold-text">Transparent</span> Pricing
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed mb-8">
            No hidden fees. No lock-in contracts. Cancel anytime. Choose the plan 
            that fits your goals and budget.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-charcoal-700 border border-white/10">
            {["monthly", "annual"].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billing === b
                    ? "bg-gold-gradient text-charcoal-900 shadow-gold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {b === "monthly" ? "Monthly" : "Annual"}
                {b === "annual" && (
                  <span className="ml-2 text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                    Save 15%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const price = Math.round(plan.price * (1 - discount));
            const isPopular = plan.id === "pro";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col rounded-2xl border ${plan.color} overflow-hidden ${
                  isPopular
                    ? "shadow-gold"
                    : "bg-charcoal-800"
                }`}
                style={isPopular ? { background: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)" } : {}}
              >
                {/* Popular glow */}
                {isPopular && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className="absolute inset-0 bg-gold-500/5" />
                  </div>
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-5 right-5 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase ${
                    isPopular
                      ? "bg-gold-gradient text-charcoal-900"
                      : "bg-white/10 text-white/70"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + name */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isPopular ? "bg-gold-gradient text-charcoal-900" : "bg-white/10 text-white/70"
                  }`}>
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-6 mt-3">
                    <span className="text-5xl font-display gold-text">${price}</span>
                    <span className="text-white/40 mb-2 text-sm">{plan.period}</span>
                    {billing === "annual" && (
                      <span className="mb-2 ml-1 text-xs text-white/30 line-through">
                        ${plan.price}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <FaCheck className="text-gold-400 mt-0.5 shrink-0 text-xs" />
                        {f}
                      </li>
                    ))}
                    {plan.missing.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/20 line-through">
                        <span className="mt-0.5 shrink-0 text-xs">✗</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleScroll("contact")}
                    className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.buttonClass}`}
                  >
                    {isPopular ? "Get Started — Best Value" : `Choose ${plan.name}`}
                  </motion.button>

                  <p className="text-center text-white/30 text-xs mt-3">
                    No lock-in · Cancel anytime
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
