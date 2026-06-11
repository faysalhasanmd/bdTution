import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";

const MyTuition = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://bdtuitions.vercel.app/tuition?status=Approved",
      );
      setTuitions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          {/* Heading */}

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {[
                      "Image",
                      "Name",
                      "Subject",
                      "Budget",
                      "Schedule",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 border-b border-gray-200 dark:border-gray-700
                          bg-lime-200 dark:bg-gray-700
                          text-gray-700 dark:text-gray-200
                          text-left text-xs font-semibold uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {tuitions.map((item) => (
                    <CustomerOrderDataRow
                      key={item._id}
                      item={item}
                      refetch={fetchData}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTuition;
