import axios from "axios";
import { useEffect, useState } from "react";
import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import toast from "react-hot-toast";

const ManageStudentPost = () => {
  const [pending, setPending] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://tuitionsbd.vercel.app/tuition?status=Pending`,
      );
      setPending(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pending tuitions");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-2xl font-bold mb-4 mt-16 text-gray-900 dark:text-white">
        Pending Tuitions
      </h2>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div className="inline-block min-w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {[
                  "Subject",
                  "Student Email",
                  "Budget",
                  "Class",
                  "Location",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 bg-lime-200 dark:bg-gray-700
                      text-left text-xs font-semibold uppercase tracking-wider
                      text-gray-700 dark:text-gray-200"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pending.map((t) => (
                <SellerOrderDataRow
                  key={t._id}
                  tuition={t}
                  refetch={fetchData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPost;
