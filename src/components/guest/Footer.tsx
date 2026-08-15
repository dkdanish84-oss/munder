import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 w-full overflow-hidden bg-[#0F172A] text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14">

        {/* 4 COLUMN GRID */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-10">

          {/* COLUMN 1 - BRAND */}
          <div className="flex w-full flex-col items-center justify-start text-center md:col-span-1">

            {/* LOGO */}
            <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-[0.3px] shadow-sm">
              <img
                src="/images/munder-logo.png"
                alt="Munder"
                className="h-full w-full scale-140 object-contain"
              />
            </div>

            {/* DESCRIPTION */}
            <p className="mt-3 w-full max-w-[220px] text-center text-[13px] leading-5 text-gray-300 sm:text-[14px] sm:leading-6">
              Professional Garden Maintenance,
              Landscaping, Irrigation & Plant Care Services.
            </p>

          </div>

          {/* COLUMN 2 - CONTACT */}
          <div className="flex w-full flex-col items-center justify-start text-center">

            <h3 className="mb-3 text-[16px] font-semibold text-white sm:text-[17px]">
              Contact
            </h3>

            <div className="flex w-full flex-col items-center gap-3 text-[13px] text-gray-300 sm:gap-4 sm:text-[14px]">

              {/* PHONE */}
              <div className="flex items-center justify-center gap-2 text-center">
                <Phone
                  size={17}
                  className="flex-shrink-0 text-green-400"
                />

                <a
                  href="tel:+917987468974"
                  className="transition-colors hover:text-white"
                >
                  +91 7987468974
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center justify-center gap-2 text-center">
                <Mail
                  size={17}
                  className="flex-shrink-0 text-green-400"
                />

                <a
                  href="mailto:info@munder.in"
                  className="transition-colors hover:text-white"
                >
                  info@munder.in
                </a>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex items-center justify-center gap-4">

                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/Bahaarefirdous"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
                  </svg>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/bfnlandscape/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                {/* YOUTUBE */}
                <a
                  href="https://youtube.com/@bfnlandscaping"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9 0-5.8 0-5.8s0-3.9.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
                  </svg>
                </a>

              </div>

              {/* LOCATION */}
              <div className="flex items-center justify-center gap-2 text-center">
                <MapPin
                  size={17}
                  className="flex-shrink-0 text-green-400"
                />

                <span>
                  Bhopal, Madhya Pradesh
                </span>
              </div>

            </div>
          </div>

          {/* COLUMN 3 - COMPANY */}
          <div className="flex w-full flex-col items-center justify-start text-center">

            <h3 className="mb-3 text-[16px] font-semibold text-white sm:text-[17px]">
              Company
            </h3>

            <div className="flex flex-col items-center gap-2 text-[13px] text-gray-300 sm:gap-3 sm:text-[14px]">

              <Link
                to="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>

              <Link
                to="/plans"
                className="transition-colors hover:text-white"
              >
                Plans
              </Link>

              <Link
                to="/login"
                className="transition-colors hover:text-white"
              >
                Login
              </Link>

            </div>
          </div>

          {/* COLUMN 4 - WHATSAPP */}
          <div className="col-span-2 flex w-full flex-col items-center justify-start text-center md:col-span-1">

            <h3 className="mb-3 text-[16px] font-semibold text-white sm:text-[17px]">
              Contact on WhatsApp
            </h3>

            <a
              href="https://wa.me/917987468974"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-[14px] font-semibold text-white shadow-md transition-colors hover:bg-green-800 sm:px-5 sm:py-3"
            >
              <MessageCircle size={19} />
              Chat on WhatsApp
            </a>

          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full border-t border-gray-700 px-4 py-3 text-center text-[11px] leading-4 text-gray-400 sm:py-4 sm:text-[13px]">
        © 2026 Munder. All Rights Reserved.
      </div>

    </footer>
  );
}
