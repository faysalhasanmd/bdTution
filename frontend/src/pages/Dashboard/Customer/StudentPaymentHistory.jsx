import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const StudentPaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://miraculous-vibrancy-production.up.railway.app//payments/student/${user.email}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 p-3 sm:p-6 mt-9">
      <div
        className="max-w-6xl mx-auto
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-xl rounded-2xl p-3 sm:p-6"
      >
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 text-indigo-700 dark:text-indigo-400">
          Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            No payment history found.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="text-xs sm:text-sm">
                  {[
                    "💰 Amount",
                    "💱 Currency",
                    "💳 Method",
                    "📊 Status",
                    "📅 Date",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="py-3 px-3 sm:px-4 text-left border-b border-gray-200 dark:border-gray-700
                        bg-lime-200 dark:bg-gray-700
                        text-gray-700 dark:text-gray-200
                        whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-xs sm:text-sm">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-t border-gray-100 dark:border-gray-700
                      hover:bg-gray-50 dark:hover:bg-gray-700/50
                      text-gray-700 dark:text-gray-300
                      transition"
                  >
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap font-medium">
                      ৳ {payment.amount}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      {payment.currency?.toUpperCase()}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap capitalize">
                      {payment.paymentMethod}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {payment.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPaymentHistory;
