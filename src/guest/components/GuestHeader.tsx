import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Plans", to: "/plans" },
  { label: "Login", to: "/login" },
];

export default function GuestHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto flex h-[90px] max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Menu / Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 text-green-900 focus:outline-none"
            aria-label="Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Center / Left-Center: Large Horizontal Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link to="/" className="flex items-center">
            <img
              src="/images/munder-logo-horizontal.png"
              alt="Munder"
              className="h-14 sm:h-16 w-auto object-contain max-w-[180px] sm:max-w-none"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-green-700 border-b-2 border-green-700 pb-1"
                  : "font-medium text-gray-700 hover:text-green-700 transition"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Responsive WhatsApp Button (Compact on Mobile, Full on Desktop) */}
        <div className="flex items-center">
          <a
            href="https://wa.me/917987468974"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-green-700 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-green-800 whitespace-nowrap"
          >
            <MessageCircle size={18} className="shrink-0" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 right-0 top-[90px] z-50 border-b bg-white shadow-xl md:hidden transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-5 px-6 py-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "border-l-4 border-green-700 pl-3 text-lg font-semibold text-green-700"
                      : "pl-3 text-lg font-medium text-gray-700 hover:text-green-700 transition"
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <a
                href="https://wa.me/917987468974"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
