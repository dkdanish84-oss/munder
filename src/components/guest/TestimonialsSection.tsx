export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Aditya Singh Rajpoot",
      role: "Chairman, Gyanveer University",
      city: "Sagar",
      image: "/images/testimonials/aditya-singh-rajpoot.jpg",
      review:
        "Professional garden maintenance and landscaping services with a focus on quality and timely work.",
    },
    {
      name: "Jitendra Singh Parihar",
      role: "MD, Hotel Royal Palace",
      city: "Sagar",
      image: "/images/testimonials/jitendra-singh-parihar.jpg",
      review:
        "Reliable garden care and landscaping support with professional service and proper maintenance.",
    },
    {
      name: "Shiv Kanta Singhvi",
      role: "Singhvi Group",
      city: "Chhabra, Rajasthan",
      image: "/images/testimonials/shiv-kanta-singhvi.jpg",
      review:
        "Professional landscaping and garden maintenance services with consistent attention to quality.",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto w-full px-4 text-center">

        <h2 className="text-center text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
          Trusted by homeowners and organizations across Madhya Pradesh and
          Rajasthan
        </p>

        <div className="mx-auto mt-10 flex w-full flex-wrap items-stretch justify-center gap-6">

          {reviews.map((item) => (
            <div
              key={item.name}
              className="box-border flex w-[340px] max-w-full flex-shrink-0 flex-col items-center rounded-3xl border-2 border-[#08783f] bg-white p-6 text-center shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-full border-2 border-[#08783f] object-cover"
              />

              <div className="mt-4 w-full text-center">
                <h4 className="break-words text-[18px] font-bold leading-6 text-[#075B32]">
                  {item.name}
                </h4>

                <p className="mt-2 break-words text-[15px] font-semibold leading-5 text-gray-800">
                  {item.role}
                </p>

                <p className="mt-1 break-words text-[14px] leading-5 text-gray-500">
                  {item.city}
                </p>
              </div>

              <div className="my-4 h-px w-12 bg-[#08783f]" />

              <p className="w-full break-words text-center text-[15px] leading-6 text-gray-600">
                {item.review}
              </p>

              <div
                className="mt-auto pt-6 text-center text-[23px] leading-none tracking-[2px] text-yellow-500"
                aria-label="5 star rating"
              >
                ★★★★★
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
