import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Luxury Villa Landscape",
    location: "Bhopal",
    category: "Landscaping",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
  },
  {
    title: "Resort Garden",
    location: "Sagar",
    category: "Garden Maintenance",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900",
  },
  {
    title: "Farm House",
    location: "Vidisha",
    category: "Landscape Design",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=900",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Our Projects
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Recent Landscaping Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Explore some of our completed landscape,
            maintenance and plantation projects.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {project.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-gray-900">
                  {project.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  {project.location}
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700"
                >
                  View Details
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>
          ))}

        </div>

        <div className="mt-16 text-center">

          <Link
            to="/projects"
            className="inline-flex items-center rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800"
          >
            View All Projects
          </Link>

        </div>

      </div>
    </section>
  );
}
