import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Leaf,
  Users,
  Headphones,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    text: "Experienced gardeners with professional training and practical knowledge to provide reliable and proper care for your garden.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Service",
    text: "High-quality garden maintenance using proper tools, suitable products, and expert supervision for better long-term results.",
  },
  {
    icon: Clock3,
    title: "On-Time Visits",
    text: "Scheduled garden visits are planned properly and completed on time, so your garden receives regular and consistent care.",
  },
  {
    icon: Leaf,
    title: "Healthy Gardens",
    text: "Complete plant care including nutrition, pruning, irrigation, seasonal maintenance, and regular attention to plant health.",
  },
  {
    icon: Users,
    title: "Customer First",
    text: "We focus on your garden's individual needs with transparent service, clear communication, and a long-term customer-first approach.",
  },
  {
    icon: Headphones,
    title: "Quick Support",
    text: "Get quick assistance for garden service questions, visit updates, maintenance requirements, and other support whenever you need it.",
  },
];

export default function WhyChooseSection() {
  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "28px 8px 35px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* HEADING */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "0 8px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              color: "#08783f",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            Why Choose Munder
          </div>

          <h2 className="text-[30px] md:text-[60px]"
            style={{
              margin: "0",
              color: "#111827",
              lineHeight: "1.12",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            Professional Garden
            <br />
            Care You Can Trust
          </h2>

          <p
            style={{
              margin: "10px auto 0",
              maxWidth: "650px",
              color: "#5b6470",
              fontSize: "15px",
              lineHeight: "1.5",
            }}
          >
            We combine trained professionals, premium products and systematic
            maintenance to keep every garden beautiful throughout the year.
          </p>
        </div>

        {/* BENEFITS — 2 COLUMNS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "10px",
            width: "100%",
          }}
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                style={{
                  minWidth: 0,
                  boxSizing: "border-box",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "18px",
                  padding: "14px 10px",
                  boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
                }}
              >
                {/* ICON + TITLE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#ecfdf3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#07834a",
                    }}
                  >
                    <Icon size={23} strokeWidth={2.5} />
                  </div>

                  <h3 className="text-[15px] md:text-[20px]"
                    style={{
                      margin: "0",
                      color: "#111827",
                      
                      lineHeight: "1.25",
                      fontWeight: 800,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p
                  style={{
                    margin: "10px 0 0",
                    color: "#5b6470",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
