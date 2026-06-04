import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaCheckCircle, FaArrowRight,
} from "react-icons/fa";

const INFO = [
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "42 King Street, Sydney CBD\nNSW 2000, Australia",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+61 2 9123 4567",
    href: "tel:+61291234567",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "hello@ironforgefitness.com.au",
    href: "mailto:hello@ironforgefitness.com.au",
  },
  {
    icon: FaClock,
    label: "Hours",
    value: "Mon – Fri: 5:00 AM – 11:00 PM\nSat: 6:00 AM – 10:00 PM\nSun: 7:00 AM – 9:00 PM\nPro/Elite: 24/7 Access",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                               e.email   = "A valid email is required.";
    if (!form.subject.trim()) e.subject  = "Please enter a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
                               e.message  = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate submission
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-charcoal-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title mb-4">
            Start Your <span className="gold-text">Journey</span> Today
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Ready to transform? Fill in the form and one of our coaches will be in touch 
            within 24 hours to set up your complimentary trial session.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 p-5 rounded-xl bg-charcoal-800 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Icon className="text-gold-400 text-base" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-white/80 text-sm hover:text-gold-400 transition-colors duration-200 leading-relaxed">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-white/5 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8!2d151.2066!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae665e892fdd%3A0x3133f8d75a1ac251!2sKing%20St%2C%20Sydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2sau!4v1680000000000!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Iron Forge Fitness Location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full glass-card-gold flex flex-col items-center justify-center text-center p-12 gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                  <FaCheckCircle className="text-gold-400 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/60 leading-relaxed max-w-sm">
                  Thanks {form.name.split(" ")[0]}! One of our coaches will reach out within 24 hours 
                  to arrange your complimentary trial session.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", subject:"", message:"" }); }}
                  className="text-gold-400 text-sm hover:text-gold-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass-card p-8 flex flex-col gap-5">
                <h3 className="text-xl font-bold text-white mb-1">
                  Book Your Free Trial Session
                </h3>
                <p className="text-white/40 text-sm -mt-3">
                  No commitment required. Just show up and experience it.
                </p>

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="James Whitfield"
                      className={`input-field ${errors.name ? "border-red-500/60" : ""}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="james@email.com"
                      className={`input-field ${errors.email ? "border-red-500/60" : ""}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+61 400 000 000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`input-field bg-charcoal-700 ${errors.subject ? "border-red-500/60" : ""}`}
                    >
                      <option value="">Select a topic</option>
                      <option>Book a Free Trial</option>
                      <option>Membership Enquiry</option>
                      <option>Personal Training</option>
                      <option>Group Classes</option>
                      <option>Nutrition Coaching</option>
                      <option>Corporate Packages</option>
                      <option>General Enquiry</option>
                    </select>
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your fitness goals, experience level, or any questions you have..."
                    className={`input-field resize-none ${errors.message ? "border-red-500/60" : ""}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
