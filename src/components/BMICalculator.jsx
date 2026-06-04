import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRulerVertical, FaWeight } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const BMI_CATEGORIES = [
  { min: 0,    max: 18.5, label: "Underweight", color: "text-blue-400",  bg: "bg-blue-400", rec: "You may benefit from a structured muscle-building and nutrition program. Speak with one of our coaches about a tailored weight-gain plan." },
  { min: 18.5, max: 25,   label: "Healthy Weight", color: "text-green-400", bg: "bg-green-400", rec: "Great work! Your BMI falls in the healthy range. Focus on maintaining this through balanced training and nutrition. Consider our group classes or strength programs to continue optimising your fitness." },
  { min: 25,   max: 30,   label: "Overweight", color: "text-yellow-400", bg: "bg-yellow-400", rec: "Our Weight Loss or Body Recomposition programs can help you reach a healthier weight. Small consistent changes deliver lasting results — our coaches are here to guide you." },
  { min: 30,   max: 35,   label: "Obese Class I", color: "text-orange-400", bg: "bg-orange-400", rec: "We recommend starting with our beginner-friendly Low Impact or Functional Fitness program alongside nutrition coaching. We've helped hundreds of people at every starting point achieve incredible transformations." },
  { min: 35,   max: 999,  label: "Obese Class II+", color: "text-red-400", bg: "bg-red-400", rec: "Please consult with your GP before beginning any intense exercise program. Iron Forge offers low-impact, medically considerate programs. Our head coach can design a safe, progressive plan tailored to you." },
];

function getCategory(bmi) {
  return BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max);
}

export default function BMICalculator() {
  const [unit, setUnit]       = useState("metric");
  const [height, setHeight]   = useState("");
  const [weight, setWeight]   = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult]   = useState(null);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (unit === "metric") {
      if (!height || isNaN(height) || +height < 50 || +height > 280) e.height = "Enter a valid height (50–280 cm)";
      if (!weight || isNaN(weight) || +weight < 10 || +weight > 600) e.weight = "Enter a valid weight (10–600 kg)";
    } else {
      if (!heightFt || isNaN(heightFt) || +heightFt < 1 || +heightFt > 9) e.heightFt = "Enter feet (1–9)";
      const inches = heightIn === "" ? 0 : +heightIn;
      if (isNaN(inches) || inches < 0 || inches >= 12) e.heightIn = "Enter inches (0–11)";
      if (!weight || isNaN(weight) || +weight < 20 || +weight > 1300) e.weight = "Enter a valid weight (20–1300 lbs)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;
    let bmi;
    if (unit === "metric") {
      const h = +height / 100;
      bmi = +weight / (h * h);
    } else {
      const totalInches = +heightFt * 12 + (heightIn === "" ? 0 : +heightIn);
      const lbs = +weight;
      bmi = (lbs / (totalInches * totalInches)) * 703;
    }
    bmi = Math.round(bmi * 10) / 10;
    setResult({ bmi, category: getCategory(bmi) });
  };

  const reset = () => {
    setResult(null);
    setHeight(""); setWeight(""); setHeightFt(""); setHeightIn(""); setErrors({});
  };

  const bmiPercent = result ? Math.min(Math.max(((result.bmi - 10) / 40) * 100, 0), 100) : 0;

  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Know Your Numbers</span>
          <h2 className="section-title mb-4">
            BMI <span className="gold-text">Calculator</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Calculate your Body Mass Index and get a personalised health recommendation from our coaching team.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            {/* Unit toggle */}
            <div className="flex gap-2 mb-8 p-1 rounded-xl bg-charcoal-700 border border-white/5">
              {["metric", "imperial"].map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); reset(); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                    unit === u
                      ? "bg-gold-gradient text-charcoal-900"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Height */}
              {unit === "metric" ? (
                <div>
                  <label className="block text-white/60 text-sm mb-2 font-medium">
                    <FaRulerVertical className="inline mr-2 text-gold-400" />Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className={`input-field ${errors.height ? "border-red-500" : ""}`}
                  />
                  {errors.height && <p className="text-red-400 text-xs mt-1">{errors.height}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-white/60 text-sm mb-2 font-medium">
                    <FaRulerVertical className="inline mr-2 text-gold-400" />Height
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="ft"
                        className={`input-field ${errors.heightFt ? "border-red-500" : ""}`}
                      />
                      {errors.heightFt && <p className="text-red-400 text-xs mt-1">{errors.heightFt}</p>}
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="in"
                        className={`input-field ${errors.heightIn ? "border-red-500" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Weight */}
              <div>
                <label className="block text-white/60 text-sm mb-2 font-medium">
                  <FaWeight className="inline mr-2 text-gold-400" />
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "e.g. 75" : "e.g. 165"}
                  className={`input-field ${errors.weight ? "border-red-500" : ""}`}
                />
                {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight}</p>}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={calculate}
              className="btn-primary w-full mb-4"
            >
              <MdOutlineHealthAndSafety className="text-xl" />
              Calculate My BMI
            </motion.button>

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 rounded-xl bg-charcoal-700 border border-white/5">
                    {/* BMI number */}
                    <div className="text-center mb-5">
                      <div className="font-display text-7xl gold-text mb-1">{result.bmi}</div>
                      <div className={`text-lg font-bold ${result.category.color}`}>
                        {result.category.label}
                      </div>
                    </div>

                    {/* Gauge */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-white/30 mb-1">
                        <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
                      </div>
                      <div className="relative h-3 rounded-full overflow-hidden bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "100%",
                            background: "linear-gradient(to right, #60a5fa 0%, #4ade80 30%, #facc15 60%, #f97316 80%, #ef4444 100%)",
                          }}
                        />
                        <motion.div
                          initial={{ left: "0%" }}
                          animate={{ left: `${bmiPercent}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-charcoal-900"
                        />
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                        Our Recommendation
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {result.category.rec}
                      </p>
                    </div>

                    <button
                      onClick={reset}
                      className="mt-4 w-full py-2 text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      Calculate Again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
