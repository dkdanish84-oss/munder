import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Leaf,
  Users,
  Headphones,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    desc: "Experienced gardeners with verified background and professional training.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Service",
    desc: "High quality maintenance with proper tools and expert supervision.",
  },
  {
    icon: Clock3,
    title: "On-Time Visits",
    desc: "Scheduled visits completed on time without unnecessary delays.",
  },
  {
    icon: Leaf,
    title: "Healthy Gardens",
    desc: "Proper nutrition, pruning, irrigation and seasonal plant care.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Long-term relationship focused service with complete transparency.",
  },
  {
    icon: Headphones,
    title: "Quick Support",
    desc: "Fast WhatsApp and phone support whenever you need assistance.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Why Choose Munder
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Professional Garden Care You Can Trust
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We combine trained professionals, premium products and
            systematic maintenance to keep every garden beautiful
            throughout the year.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-green-600 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-green-100 p-4">
                  <Icon className="text-green-700" size={34} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
