import {
  Trees,
  Flower2,
  Sprout,
  Shovel,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Garden Maintenance",
    icon: Trees,
    description:
      "Weekly, fortnightly and monthly maintenance for residential and commercial gardens.",
  },
  {
    title: "Landscaping",
    icon: Flower2,
    description:
      "Complete landscape design, execution and renovation with premium quality finishing.",
  },
  {
    title: "Plant Supply",
    icon: Sprout,
    description:
      "Indoor, outdoor, flowering, fruit, bonsai and premium ornamental plants.",
  },
  {
    title: "Lawn Development",
    icon: Shovel,
    description:
      "New lawn installation, leveling, grass replacement and seasonal care.",
  },
  {
    title: "Irrigation System",
    icon: Droplets,
    description:
      "Automatic drip irrigation and sprinkler systems for every garden size.",
  },
  {
    title: "Garden Consultation",
    icon: Trees,
    description:
      "Expert consultation for home gardens, farmhouses, villas and commercial landscapes.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Complete Gardening Solutions
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Munder provides complete gardening and landscaping
            solutions from planning to maintenance with trained
            professionals and premium quality plants.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-green-600 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-green-100 p-4">
                  <Icon
                    size={36}
                    className="text-green-700"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-green-700"
                >
                  Book Service
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}

        </div>

        <div className="mt-20 rounded-3xl bg-green-700 px-8 py-14 text-center text-white">

          <h3 className="text-4xl font-bold">
            Ready To Transform Your Garden?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-green-100">
            Book a free site visit and let our experts design,
            develop and maintain your dream garden.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:bg-green-100"
          >
            Schedule Free Visit
          </Link>

        </div>

      </div>
    </section>
  );
}
