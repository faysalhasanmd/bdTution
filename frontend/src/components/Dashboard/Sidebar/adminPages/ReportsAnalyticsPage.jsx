import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const ReportsAnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://miraculous-vibrancy-production.up.railway.app/admin/reports/transactions",
      );
      setTotalEarnings(res.data.totalEarnings);
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reports");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-gray-600">
          <LoadingSpinner></LoadingSpinner>
        </p>
      ) : (
        <>
          {/* Total Earnings Card */}
          <div className="mb-8 mt-8 flex items-center p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg">
            <FaMoneyBillWave className="text-5xl mr-6" />
            <div>
              <h2 className="text-xl font-semibold">Total Platform Earnings</h2>
              <p className="text-4xl font-bold mt-2">৳ {totalEarnings}</p>
            </div>
          </div>

          {/* Transaction History Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Currency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((t, idx) => (
                  <tr
                    key={t._id}
                    className={
                      idx % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t.applicationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      ৳ {t.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {t.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          t.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {t.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(t.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsAnalyticsPage;
