import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "₹999",
    period: "/month",
    popular: false,
    features: [
      "2 Garden Visits",
      "Basic Cleaning",
      "Watering",
      "Plant Health Check",
      "Phone Support",
    ],
  },
  {
    name: "Standard",
    price: "₹2,499",
    period: "/month",
    popular: true,
    features: [
      "4 Garden Visits",
      "Pruning & Trimming",
      "Fertilizer Application",
      "Pest Inspection",
      "Priority Support",
    ],
  },
  {
    name: "Premium",
    price: "₹4,999",
    period: "/month",
    popular: false,
    features: [
      "Unlimited Visits",
      "Landscape Care",
      "Seasonal Plantation",
      "Irrigation Check",
      "Dedicated Gardener",
    ],
  },
];

export default function PlansSection() {
  return (
    <section
      id="plans"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Maintenance Plans
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Choose Your Perfect Plan
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Affordable garden maintenance plans for homes,
            villas, apartments and commercial properties.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-xl ${
                plan.popular
                  ? "border-green-700 ring-2 ring-green-700"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="mb-6 inline-block rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-bold text-gray-900">
                {plan.name}
              </h3>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-bold text-green-700">
                  {plan.price}
                </span>

                <span className="pb-1 text-gray-600">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={20}
                      className="text-green-700"
                    />

                    <span className="text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-10 block rounded-xl py-4 text-center font-semibold transition ${
                  plan.popular
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "border border-green-700 text-green-700 hover:bg-green-50"
                }`}
              >
                Choose Plan
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
