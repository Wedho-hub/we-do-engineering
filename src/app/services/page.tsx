import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | We Do Engineering",
  description:
    "Explore our full range of mechanical engineering and handyman services for homeowners, factories, and subcontractors.",
};

const serviceCategories = [
  {
    category: "Mechanical Engineering",
    icon: "⚙️",
    color: "bg-blue-50 border-blue-200",
    accentColor: "text-[#1e3a5f]",
    services: [
      {
        title: "Engineering Consultation",
        description:
          "Expert advice on mechanical systems, equipment selection, and engineering challenges. We review your problem and deliver a practical, cost-effective solution.",
      },
      {
        title: "Design & Drafting",
        description:
          "Technical drawings and design work for mechanical components, assemblies, and systems. Accurate documentation for fabrication and installation.",
      },
      {
        title: "System Analysis",
        description:
          "Evaluation of existing mechanical systems for performance, safety, and efficiency. Includes load calculations, stress analysis, and improvement recommendations.",
      },
      {
        title: "Equipment Selection & Procurement",
        description:
          "Help choosing the right machinery, tools, and materials for your project. We source quality products that match your requirements and budget.",
      },
    ],
  },
  {
    category: "Installations & Fitting",
    icon: "🔩",
    color: "bg-orange-50 border-orange-200",
    accentColor: "text-[#f97316]",
    services: [
      {
        title: "Mechanical Installations",
        description:
          "Installation of pumps, motors, conveyors, gearboxes, and other mechanical equipment to manufacturer specifications.",
      },
      {
        title: "Pipework & Plumbing",
        description:
          "Domestic and light industrial pipework installation, repairs, and modifications. Hot and cold water, drainage, and compressed air lines.",
      },
      {
        title: "Structural Assembly",
        description:
          "Erection and fitting of structural steelwork, frames, brackets, and support structures. Precise alignment and secure fastening every time.",
      },
      {
        title: "Welding & Fabrication",
        description:
          "MIG, stick welding, and general metal fabrication for both structural and decorative applications.",
      },
    ],
  },
  {
    category: "Maintenance & Repairs",
    icon: "🔧",
    color: "bg-green-50 border-green-200",
    accentColor: "text-green-700",
    services: [
      {
        title: "Planned Maintenance",
        description:
          "Scheduled preventative maintenance programs tailored to your equipment and facility. Reduce unexpected failures and extend machine life.",
      },
      {
        title: "Breakdown Repairs",
        description:
          "Fast response to mechanical breakdowns and failures. Diagnosis, repair, and return-to-service with minimal downtime.",
      },
      {
        title: "Fault Finding & Diagnostics",
        description:
          "Systematic investigation of recurring faults and failure modes. Root cause analysis with corrective action recommendations.",
      },
      {
        title: "Overhauls & Reconditioning",
        description:
          "Full strip-down, inspection, and rebuild of mechanical equipment to restore performance and extend operational life.",
      },
    ],
  },
  {
    category: "Home Handyman Services",
    icon: "🏠",
    color: "bg-purple-50 border-purple-200",
    accentColor: "text-purple-700",
    services: [
      {
        title: "General Home Repairs",
        description:
          "Fixing what is broken around the house — doors, windows, fencing, gates, and everything in between.",
      },
      {
        title: "Plumbing Fixes",
        description:
          "Leaky taps, burst pipes, blocked drains, and geyser maintenance handled quickly and correctly.",
      },
      {
        title: "Installations",
        description:
          "Hanging shelves, mounting TV brackets, fitting ceiling fans, installing appliances, and more.",
      },
      {
        title: "Minor Renovations",
        description:
          "Tiling, painting, partition walls, and small renovation jobs done to a professional finish.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#1e3a5f] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#f97316] font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">What We Offer</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              From mechanical engineering consultation to hands-on repairs and installations — we cover a broad range of
              services across residential, industrial, and construction sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">{cat.icon}</span>
                <h2 className={`text-2xl md:text-3xl font-bold ${cat.accentColor}`}>{cat.category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.services.map((service) => (
                  <div
                    key={service.title}
                    className={`${cat.color} border rounded-xl p-6 hover:shadow-md transition-shadow`}
                  >
                    <h3 className="font-bold text-[#1a1a2e] mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">How We Work</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Simple, professional, and transparent from start to finish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Enquire", description: "Reach out via our contact form or phone call with a description of your job." },
              { step: "02", title: "Quote", description: "We assess the scope and provide a clear, no-obligation quote with a timeline." },
              { step: "03", title: "Schedule", description: "We agree on a start date that suits you and confirm all requirements upfront." },
              { step: "04", title: "Deliver", description: "We complete the work to a high standard, clean up, and ensure your satisfaction." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#1e3a5f] text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f97316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Need a Service Not Listed?</h2>
          <p className="text-white/90 mb-8">
            Our experience spans a wide range of trades and engineering disciplines. Get in touch and we will let you
            know if we can help.
          </p>
          <Link
            href="/contact"
            className="bg-white text-[#f97316] font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
