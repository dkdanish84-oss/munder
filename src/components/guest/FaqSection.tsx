import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide a free garden visit?",
    answer:
      "Yes. Munder provides a FREE site visit and consultation. Our team visits your garden, understands your requirements and suggests the right maintenance or landscaping solution before starting the work.",
  },
  {
    question: "Which cities do you currently serve?",
    answer:
      "Currently, Munder provides garden maintenance and landscaping services across Bhopal and nearby areas. We are gradually expanding our services to more cities and locations.",
  },
  {
    question: "Do you provide monthly garden maintenance?",
    answer:
      "Yes. We provide regular monthly garden maintenance based on your garden size and requirements. Services can include pruning, cleaning, watering, plant care, nutrition and seasonal maintenance.",
  },
  {
    question: "Can I buy plants from Munder?",
    answer:
      "Yes. Munder also provides quality plants, pots and garden accessories. You can contact our team to check plant availability and get guidance about the right plants for your garden.",
  },
  {
    question: "How can I book a visit?",
    answer:
      "Booking a visit is simple. Click on the 'Book Free Visit' button or contact us through WhatsApp. Our team will collect the basic details and arrange a suitable time for your garden visit.",
  },
];

export default function FaqSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto flex w-full flex-col items-center px-4 text-center">

        <h2 className="w-full text-center text-3xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="mt-3 w-full text-center text-gray-500">
          Everything you need to know before booking Munder.
        </p>

        <div className="mx-auto mt-10 flex w-full flex-col items-center gap-5">

          {faqs.map((item, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="w-full max-w-[700px] overflow-hidden rounded-2xl border-2 border-[#08783f] bg-white text-center shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="flex min-h-[58px] w-full items-center justify-center gap-3 px-5 py-3 text-center"
                >
                  <span className="break-words text-[17px] font-semibold leading-6 text-gray-900 md:text-[19px]">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`flex-shrink-0 text-[#08783f] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-[#08783f]/30 px-5 py-6 text-center text-[15px] leading-7 text-gray-600 md:px-8 md:text-[16px]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
