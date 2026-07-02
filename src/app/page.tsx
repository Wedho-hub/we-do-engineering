import Link from "next/link";

const services = [
  {
    icon: "🔧",
    title: "Mechanical Engineering",
    description:
      "Design, analysis, and consultation for mechanical systems. From component selection to full system reviews.",
  },
  {
    icon: "🏗️",
    title: "Installations & Fitting",
    description:
      "Accurate installation of equipment, pipework, structural components, and mechanical assemblies.",
  },
  {
    icon: "🔩",
    title: "Maintenance & Repairs",
    description:
      "Planned maintenance schedules and reactive repairs to keep your machinery and facilities running smoothly.",
  },
  {
    icon: "🏠",
    title: "Home Handyman Services",
    description:
      "General household repairs, plumbing, electrical basics, and renovations handled by a skilled professional.",
  },
  {
    icon: "🏭",
    title: "Factory & Plant Support",
    description:
      "On-site engineering support for manufacturing plants, including breakdowns, upgrades, and compliance checks.",
  },
  {
    icon: "🤝",
    title: "Subcontractor Work",
    description:
      "Reliable, qualified support for construction and engineering subcontractors needing skilled hands on-site.",
  },
];

const clients = [
  {
    icon: "🏡",
    title: "Homeowners",
    description:
      "Get professional results on your repairs and renovations without the guesswork. We treat your home like our own.",
  },
  {
    icon: "🏭",
    title: "Factories & Plants",
    description:
      "Minimize downtime with expert mechanical support. From planned maintenance to emergency callouts.",
  },
  {
    icon: "🔨",
    title: "Subcontractors",
    description:
      "Need a skilled pair of hands on your next project? We slot into your team seamlessly and deliver on time.",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "3", label: "Client Types Served" },
  { value: "100%", label: "Commitment to Quality" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1e3a5f] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span>⚙</span> Mechanical Engineering & Skilled Handyman Services
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Engineering Solutions,{" "}
              <span className="text-[#f97316]">Built to Last</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              We bring mechanical engineering expertise and hands-on skilled labour to homeowners, factories, and
              subcontractors. Quality work, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#f97316] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-lg text-center transition-colors duration-200 text-lg"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors duration-200 text-lg"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#163057] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-[#f97316]">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">What We Do</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              A full range of mechanical engineering and skilled handyman services, tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-[#f8f9fa] border border-gray-200 rounded-xl p-7 hover:border-[#f97316] hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#f97316] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Who We Serve</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Whether you are a homeowner, a factory manager, or a subcontractor, we have the skills for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clients.map((client) => (
              <div
                key={client.title}
                className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-5">{client.icon}</div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{client.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
                Why Choose <span className="text-[#f97316]">We Do Engineering?</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We bring real mechanical engineering knowledge together with hands-on trade experience. Every job gets
                our full attention — from small home repairs to complex factory maintenance.
              </p>
              <ul className="space-y-4">
                {[
                  "Qualified mechanical engineering background",
                  "Practical, hands-on experience across multiple trades",
                  "Reliable, on-time, and on-budget delivery",
                  "Clear communication at every step",
                  "Serving homeowners, factories, and subcontractors",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#f97316] font-bold text-lg mt-0.5">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-block mt-8 bg-[#1e3a5f] hover:bg-[#163057] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="bg-linear-to-br from-[#1e3a5f] to-[#163057] rounded-2xl p-10 text-white">
              <div className="text-6xl mb-6 text-center">⚙️</div>
              <blockquote className="text-lg italic text-gray-200 leading-relaxed text-center">
                &ldquo;We don&apos;t just do the job — we engineer the solution. Every task, big or small, gets the
                same level of care, precision, and professionalism.&rdquo;
              </blockquote>
              <div className="mt-6 text-center text-[#f97316] font-semibold">— We Do Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f97316]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Tell us what you need and we will get back to you with a no-obligation quote. Professional engineering and
            handyman services, ready when you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#f97316] font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Contact Us Today
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white font-semibold px-10 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
