import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Contact Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Let's Build Your Dream Garden
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Book a free consultation or request a site visit.
            Our landscaping experts will contact you shortly.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          <div className="space-y-6">

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <MapPin className="text-green-700" size={28} />
              <div>
                <h3 className="font-bold text-lg">Office Address</h3>
                <p className="mt-2 text-gray-600">
                  Bhopal, Madhya Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <Phone className="text-green-700" size={28} />
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="mt-2 text-gray-600">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <Mail className="text-green-700" size={28} />
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="mt-2 text-gray-600">
                  info@munder.in
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <Clock className="text-green-700" size={28} />
              <div>
                <h3 className="font-bold text-lg">Working Hours</h3>
                <p className="mt-2 text-gray-600">
                  Monday – Saturday
                </p>
                <p className="text-gray-600">
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

          </div>

          <form className="rounded-3xl bg-white p-8 shadow-lg">

            <h3 className="mb-6 text-2xl font-bold">
              Request a Free Site Visit
            </h3>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border p-4 outline-none focus:border-green-700"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full rounded-xl border p-4 outline-none focus:border-green-700"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="City"
                className="w-full rounded-xl border p-4 outline-none focus:border-green-700"
              />

              <textarea
                rows={5}
                placeholder="Tell us about your garden..."
                className="w-full rounded-xl border p-4 outline-none focus:border-green-700"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-green-700 py-4 font-semibold text-white transition hover:bg-green-800"
              >
                Book Free Visit
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
