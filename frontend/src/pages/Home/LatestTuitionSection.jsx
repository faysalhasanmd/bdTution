import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../../components/Home/Card";

const LatestTuitionSection = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bdtutionsf.vercel.app/tuition/latest")
      .then((res) => res.json())
      .then((data) => {
        setTuitions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        😕 No Latest Tuition Found
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid gap-3 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tuitions.map((tuition) => (
            <Card key={tuition._id} item={tuition} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTuitionSection;
