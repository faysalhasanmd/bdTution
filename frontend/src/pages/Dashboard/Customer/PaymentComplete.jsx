import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CheckCircle, XCircle } from "lucide-react";

const PaymentComplete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://bdtuitions.vercel.app/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          },
        );

        const data = await response.json();

        if (data.success) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600">Verifying payment...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div
                className={`p-4 rounded-full ${
                  verified ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {verified ? (
                  <CheckCircle className="text-green-600 w-14 h-14" />
                ) : (
                  <XCircle className="text-red-600 w-14 h-14" />
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {verified ? "Payment Successful 🎉" : "Payment Failed ❌"}
            </h1>

            <p className="text-gray-600 mb-6 text-sm md:text-base">
              {verified
                ? "Your payment has been completed successfully. The tutor has been confirmed for your tuition."
                : "We could not verify your payment. Please try again or contact support."}
            </p>

            {verified && (
              <div className="bg-indigo-50 rounded-xl p-5 text-left text-sm text-gray-700 space-y-2 mb-6 border border-indigo-100">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    Confirmed
                  </span>
                </p>
                <p>
                  <span className="font-medium">Session ID:</span> {sessionId}
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/dashboard/tutor-applied-tuition")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Back to Dashboard
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
              >
                Go Home
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              Need help? Contact support anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentComplete;
