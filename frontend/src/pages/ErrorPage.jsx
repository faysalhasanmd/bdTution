import Button from "../components/Shared/Button/Button";
import { useNavigate } from "react-router";
import errorImg from "../assets/images/1_7KCpGW9_D2rIlNV2JhFspQ.png";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-50 flex items-center justify-center px-6">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center border border-gray-100">
        {/* 404 Image */}
        <div className="flex justify-center">
          <img
            loading="lazy"
            src={errorImg}
            alt="404 Not Found"
            className="w-64 md:w-80 mb-6 drop-shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-4 text-red-600 text-sm md:text-base">
          Sorry, the page you are looking for doesn’t exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-200 hover:bg-gray-100 hover:shadow"
          >
            ← Go Back
          </button>

          <Button label={"🏠 Take Me Home"} onClick={() => navigate("/")} />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
