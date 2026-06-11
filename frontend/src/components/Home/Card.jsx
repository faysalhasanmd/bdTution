import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = ({ item }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const shortDesc =
    item.description?.length > 80
      ? item.description.slice(0, 80) + "..."
      : item.description;

  return (
    <div
      data-aos="fade-up"
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        {item.image ? (
          <img
            loading="lazy"
            src={item.image}
            alt={item.subject || "Tuition"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-lime-50">
            <span className="text-4xl">📚</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Subject badge */}
        {item.subject && (
          <span className="absolute top-3 left-3 bg-lime-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {item.subject}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 truncate leading-snug">
          {item.studentName || "Student"}
        </h3>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span className="text-lime-600">💰</span>
            <span className="truncate">
              {item.budget ? `${item.budget} Tk/mo` : "—"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span className="text-lime-600">📍</span>
            <span className="truncate">{item.location || "—"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs col-span-2">
            <span className="text-lime-600">🗓️</span>
            <span className="truncate">{item.schedule || "—"}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Description */}
        {shortDesc && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {shortDesc}
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/tuition/${item._id}`}
          className="mt-auto block text-center w-full py-2 px-4 bg-lime-500 text-white text-sm font-medium rounded-lg hover:bg-lime-600 active:scale-95 transition-all duration-150"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default Card;
