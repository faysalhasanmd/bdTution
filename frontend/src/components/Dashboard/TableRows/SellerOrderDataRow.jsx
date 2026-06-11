import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SellerOrderDataRow = ({ tuition, refetch }) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const res = await axios.put(
        `https://bdtutionsf.vercel.app/tuition/approve/${tuition._id}`,
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Tuition Approved!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Approval Failed");
    }
    setIsApproving(false);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const res = await axios.put(
        `https://bdtutionsf.vercel.app/tuition/reject/${tuition._id}`,
      );

      if (res.data.modifiedCount > 0) {
        toast.error("Tuition Rejected!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Rejection Failed");
    }
    setIsRejecting(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.subject}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.studentEmail}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ৳ {tuition.budget}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.class}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.location}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-yellow-600 font-semibold">
        {tuition.status}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="px-4 py-1 bg-green-500 text-white rounded-md disabled:bg-gray-300"
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={handleReject}
          disabled={isRejecting}
          className="px-4 py-1 bg-red-500 text-white rounded-md disabled:bg-gray-300"
        >
          {isRejecting ? "Processing..." : "Reject"}
        </button>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
