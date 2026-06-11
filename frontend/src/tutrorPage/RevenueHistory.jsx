import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { AuthContext } from "../providers/AuthContext";

const RevenueHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://bdtutionsf.vercel.app/payments/tutor/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const paidCount = payments.filter((p) => p.paymentStatus === "paid").length;

  if (loading) return <LoadingSpinner />;

  const statusBadge = (status) => (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        status === "paid"
          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
          : "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "paid" ? "bg-green-500" : "bg-red-500"}`}
      />
      {status.toUpperCase()}
    </span>
  );

  const amountClass = (status) =>
    status === "paid"
      ? "text-green-600 dark:text-green-400"
      : "text-red-500 dark:text-red-400";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 px-3 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 mt-6 sm:mt-8 lg:mt-9 transition-colors">
      {/* Header */}
      {/* <div className="text-center mb-8">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 rounded-full mb-2 md:mb-3 tracking-widest uppercase">
          Dashboard
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Revenue History
        </h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 md:mt-3 text-sm md:text-base">
          Track all your earnings from tutoring sessions
        </p>
      </div> */}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Total Earnings */}
        <div className="sm:col-span-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-indigo-200 dark:shadow-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-indigo-200 text-xs sm:text-sm font-medium uppercase tracking-widest mb-1">
              Total Earnings
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold leading-none">
              ৳{totalEarnings.toLocaleString()}
            </p>
            <p className="text-indigo-300 text-xs sm:text-sm mt-1">
              BDT · All time
            </p>
          </div>
          <div className="bg-indigo-500/50 rounded-xl p-3 sm:p-4 text-center min-w-[90px]">
            <p className="text-2xl sm:text-3xl font-bold">{payments.length}</p>
            <p className="text-indigo-200 text-xs mt-1 uppercase tracking-wide">
              Transactions
            </p>
          </div>
        </div>

        {/* Paid Count */}
        <div className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-2">
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">
              Paid
            </p>
            <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">
              {paidCount}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-full px-3 py-1">
            <span className="text-green-600 dark:text-green-400 text-xs font-semibold">
              {payments.length > 0
                ? Math.round((paidCount / payments.length) * 100)
                : 0}
              % success
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl shadow-sm text-center py-16 sm:py-24 px-6">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.42 0-8-1.79-8-4V6c0-2.21 3.58-4 8-4s8 1.79 8 4v8c0 2.21-3.58 4-8 4z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
            No Payments Yet
          </h3>
          <p className="text-slate-400 dark:text-slate-500 mt-2 text-sm sm:text-base max-w-xs mx-auto">
            Once a student completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-700 border-b border-slate-100 dark:border-gray-600">
                  {["Session ID", "Method", "Date", "Status", "Amount"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`px-6 py-4 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs ${i === 4 ? "text-right" : "text-left"}`}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-slate-50/70 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">
                      <span className="bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded break-all">
                        {payment.sessionId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {statusBadge(payment.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold text-base ${amountClass(payment.paymentStatus)}`}
                      >
                        {payment.currency?.toUpperCase()} {payment.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet Cards */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl shadow-sm p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">
                      Session ID
                    </p>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-gray-700 px-2 py-1 rounded break-all">
                      {payment.sessionId}
                    </p>
                  </div>
                  {statusBadge(payment.paymentStatus)}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 capitalize">
                      {payment.paymentMethod}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <p
                    className={`font-bold text-xl ${amountClass(payment.paymentStatus)}`}
                  >
                    {payment.currency?.toUpperCase()} {payment.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl shadow-sm p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  {statusBadge(payment.paymentStatus)}
                  <p
                    className={`font-bold text-lg ${amountClass(payment.paymentStatus)}`}
                  >
                    {payment.currency?.toUpperCase()} {payment.amount}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">
                    Session ID
                  </p>
                  <p className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-gray-700 px-2 py-1 rounded break-all">
                    {payment.sessionId}
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-gray-700">
                  <span className="capitalize">{payment.paymentMethod}</span>
                  <span>
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueHistory;
