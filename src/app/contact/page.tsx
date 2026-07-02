"use client";

import { useState } from "react";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "info@wedoengineering.co.za",
    href: "mailto:info@wedoengineering.co.za",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+27 (0) 00 000 0000",
    href: "tel:+270000000000",
  },
  {
    icon: "📍",
    label: "Location",
    value: "South Africa",
    href: null,
  },
  {
    icon: "🕐",
    label: "Hours",
    value: "Mon – Fri: 7am – 5pm",
    href: null,
  },
];

const services = [
  "Mechanical Engineering Consultation",
  "Installations & Fitting",
  "Maintenance & Repairs",
  "Home Handyman Services",
  "Factory & Plant Support",
  "Subcontractor Work",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[#1e3a5f] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#f97316] font-semibold text-sm uppercase tracking-widest mb-3">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get a Free Quote</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us about your project or problem and we will get back to you with a clear, no-obligation quote.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Contact Details</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reach out directly or fill in the form and we will respond within one business day.
              </p>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#1e3a5f] font-medium hover:text-[#f97316] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#1e3a5f] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#1e3a5f] rounded-xl p-6 text-white mt-6">
                <div className="text-2xl mb-3">⚙️</div>
                <p className="font-semibold mb-1">Emergency Callouts</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  For urgent factory or plant breakdowns, please call us directly. We will do our best to respond as
                  quickly as possible.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-3">Message Received!</h3>
                  <p className="text-gray-500 max-w-sm">
                    Thank you for reaching out. We will review your request and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: "", email: "", phone: "", service: "", message: "" });
                      setSubmitted(false);
                    }}
                    className="mt-8 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1e3a5f]">Tell Us About Your Project</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+27 000 000 0000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition bg-white"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Describe Your Job <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please describe the work you need done, including location, urgency, and any relevant details..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f97316] hover:bg-orange-500 text-white font-bold py-4 rounded-lg transition-colors text-lg"
                  >
                    Send My Enquiry
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    We will respond within one business day. No spam, no obligation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
