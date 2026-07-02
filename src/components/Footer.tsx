import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="text-[#f97316]">⚙</span>
              <span>We Do Engineering</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Professional mechanical engineering and skilled handy work — built on experience, delivered with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#f97316] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Get In Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] mt-0.5">📧</span>
                <span>info@wedoengineering.co.za</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] mt-0.5">📞</span>
                <span>+27 (0) 00 000 0000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] mt-0.5">📍</span>
                <span>South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} We Do Engineering. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
