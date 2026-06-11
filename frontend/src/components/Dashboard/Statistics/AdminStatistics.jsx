import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa"; // 👈 এরর আইকন যোগ করা হয়েছে
import AOS from "aos";
import "aos/dist/aos.css";

// Chart.js setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 👈 এরর ট্র্যাক করার জন্য নতুন স্টেট

  // ✅ AOS INIT
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null); // নতুন করে রিকোয়েস্ট পাঠানোর আগে এরর ক্লিন করা
        const res = await axios.get(
          "https://bdtutionsf.vercel.app/admin/dashboard-stats",
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError(
          "সার্ভার থেকে ডাটা লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
        ); // 👈 এরর মেসেজ সেট করা
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ১. লোডিং অবস্থায় স্পিনার দেখাবে
  if (loading) return <LoadingSpinner />;

  // ২. যদি এপিআই ফেইল করে এবং stats null থাকে, তবে ক্রাশ না করে এই সুন্দর মেসেজটি দেখাবে
  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            কোথাও একটি সমস্যা হয়েছে!
          </h3>
          <p className="text-gray-600 mb-4">{error || "ডাটা পাওয়া যায়নি।"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  // ৩. ডাটা সঠিকভাবে পেলেই কেবল নিচের কোডগুলো রান করবে (এখন সম্পূর্ণ নিরাপদ)
  const admins =
    stats.admins !== undefined
      ? stats.admins
      : stats.users - (stats.students + stats.tutors);

  const COLORS = {
    student: "#4e73df",
    tutor: "#1cc88a",
    admin: "#f6c23e",
    revenue: "#36b9cc",
    pending: "#e74a3b",
    application: "#858796",
  };

  const usersPieData = {
    labels: ["Students", "Tutors", "Admins"],
    datasets: [
      {
        data: [stats.students, stats.tutors, admins],
        backgroundColor: [COLORS.student, COLORS.tutor, COLORS.admin],
      },
    ],
  };

  const revenueBarData = {
    labels: ["Revenue"],
    datasets: [
      {
        data: [stats.totalRevenue],
        backgroundColor: COLORS.revenue,
      },
    ],
  };

  const tuitionsBarData = {
    labels: ["Tuitions"],
    datasets: [
      {
        label: "Approved",
        data: [stats.approvedTuitions],
        backgroundColor: COLORS.student,
      },
      {
        label: "Pending",
        data: [stats.totalTuitions - stats.approvedTuitions],
        backgroundColor: COLORS.pending,
      },
    ],
  };

  const applicationsPieData = {
    labels: ["Applications"],
    datasets: [
      {
        data: [stats.totalApplications],
        backgroundColor: [COLORS.application],
      },
    ],
  };

  const Card = ({ title, value, color }) => (
    <div
      data-aos="zoom-in"
      className="card-box"
      style={{ backgroundColor: color }}
    >
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* 🔥 Header */}
      <div
        data-aos="fade-down"
        style={{
          marginTop: "48px",
          marginBottom: "28px",
          padding: "25px 30px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #4e73df, #224abe)",
          color: "#fff",
        }}
      >
        <h2 className="flex items-center gap-2 text-2xl">
          <FaChartLine /> Admin Dashboard
        </h2>
        <p className="text-sm opacity-80 mt-2">
          Overview of platform performance
        </p>
      </div>

      {/* 🎯 Cards */}
      <div className="flex gap-5 flex-wrap mb-10">
        <Card title="Total Users" value={stats.users} color="#6c757d" />
        <Card title="Students" value={stats.students} color={COLORS.student} />
        <Card title="Tutors" value={stats.tutors} color={COLORS.tutor} />
        <Card title="Admins" value={admins} color={COLORS.admin} />
        <Card
          title="Revenue"
          value={`${stats.totalRevenue} BDT`}
          color={COLORS.revenue}
        />
        <Card
          title="Tuitions"
          value={stats.totalTuitions}
          color={COLORS.pending}
        />
        <Card
          title="Applications"
          value={stats.totalApplications}
          color={COLORS.application}
        />
      </div>

      {/* 📊 Charts */}
      <div className="flex gap-6 flex-wrap">
        <div data-aos="fade-up" className="chart-box">
          <h3>Users Breakdown</h3>
          <Pie data={usersPieData} />
        </div>

        <div data-aos="fade-up" className="chart-box">
          <h3>Revenue</h3>
          <Bar
            data={revenueBarData}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>

        <div data-aos="fade-up" className="chart-box">
          <h3>Tuitions</h3>
          <Bar data={tuitionsBarData} />
        </div>

        <div data-aos="fade-up" className="chart-box">
          <h3>Applications</h3>
          <Pie data={applicationsPieData} />
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .chart-box {
            flex: 1;
            min-width: 300px;
            background: #fff;
            padding: 20px;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }

          .chart-box h3 {
            margin-bottom: 15px;
            color: #4e73df;
          }

          .card-box {
            flex: 1;
            min-width: 160px;
            padding: 18px;
            border-radius: 14px;
            color: white;
            text-align: center;
            transition: 0.3s;
            cursor: pointer;
          }

          .card-box:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
    </div>
  );
};

export default AdminStatistics;
