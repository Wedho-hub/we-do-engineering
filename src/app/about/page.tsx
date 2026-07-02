import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | We Do Engineering",
  description:
    "Learn about the experience and expertise behind We Do Engineering — mechanical engineering skills and handyman experience at your service.",
};

const values = [
  {
    icon: "🎯",
    title: "Precision",
    description: "Engineering is about getting it right, not just getting it done. We apply that standard to every job.",
  },
  {
    icon: "🤝",
    title: "Reliability",
    description: "We show up when we say we will, finish when we promise, and communicate if anything changes.",
  },
  {
    icon: "💡",
    title: "Problem Solving",
    description: "We approach every challenge with an engineer's mindset — diagnose first, then fix it properly.",
  },
  {
    icon: "💪",
    title: "Hard Work",
    description: "No shortcuts. We put in the effort required to deliver results that last.",
  },
];

const skills = [
  { skill: "Mechanical Engineering Design", level: 90 },
  { skill: "Maintenance & Fault Diagnosis", level: 95 },
  { skill: "Pipework & Plumbing", level: 85 },
  { skill: "Welding & Fabrication", level: 80 },
  { skill: "Electrical Basics", level: 70 },
  { skill: "General Construction & Renovation", level: 85 },
];

const sectors = [
  "Manufacturing & Production",
  "Mining Support Services",
  "Residential Renovation",
  "Commercial Construction",
  "Agricultural Equipment",
  "HVAC & Utilities",
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#1e3a5f] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#f97316] font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">The People Behind the Work</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We Do Engineering was founded on a simple belief: that quality mechanical engineering and skilled handyman
              services should be accessible, honest, and delivered with pride.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We Do Engineering was built from years of real-world mechanical engineering experience combined with
                  hands-on trade skills developed across residential, industrial, and construction environments.
                </p>
                <p>
                  We saw a gap in the market for a service provider that could bridge the gap between formal engineering
                  knowledge and practical, get-your-hands-dirty workmanship. Too often, homeowners struggle to find
                  someone who truly understands the technical side, and factories can&apos;t find contractors who think
                  like engineers.
                </p>
                <p>
                  So we built We Do Engineering to fill that gap. We bring both the qualifications and the calluses —
                  and we think that combination is exactly what our clients need.
                </p>
              </div>
            </div>
            <div className="bg-[#f0f4f8] rounded-2xl p-8">
              <h3 className="text-[#1e3a5f] font-bold text-xl mb-6">Sectors We Have Worked In</h3>
              <ul className="space-y-3">
                {sectors.map((sector) => (
                  <li key={sector} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#f97316] flex-shrink-0" />
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Our Skill Set</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A diverse range of technical and practical skills built over more than a decade of hands-on work.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {skills.map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#1a1a2e]">{item.skill}</span>
                  <span className="text-[#f97316] font-semibold">{item.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1e3a5f] rounded-full"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">What We Stand For</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our values are not just words on a wall — they are how we operate on every job site.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-7 text-center hover:border-[#f97316] hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Ready to experience engineering done right? We are ready to hear about your project.
          </p>
          <Link
            href="/contact"
            className="bg-[#f97316] hover:bg-orange-500 text-white font-bold px-10 py-4 rounded-lg transition-colors text-lg inline-block"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
