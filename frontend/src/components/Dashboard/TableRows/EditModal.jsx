import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditModal = ({ isOpen, closeModal, item, refetch }) => {
  if (!isOpen) return null;
  //initial set value
  const [form, setForm] = useState({
    subject: item?.subject,
    budget: item?.budget,
    schedule: item?.schedule,
    image: item?.image,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `https://bdtuitions.vercel.app/tuition/update/${item._id}`,
        form,
      );

      if (data.modifiedCount === 1) {
        toast.success("Updated Successfully!");
        closeModal();
        refetch();
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      toast.error("Update Failed!", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Tuition</h2>

        <div className="flex flex-col gap-3">
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Subject"
          />

          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Budget"
          />

          <input
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Schedule"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Image URL"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className=" p-3 mt-3 text-center font-medium text-white bg-red-300 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className=" p-3 mt-3 text-center font-medium text-white bg-lime-500 rounded-md"
          >
            Update
          </button>
          {/* <button
              type="submit"
              className="w-full p-3 mt-3 text-center font-medium text-white bg-lime-500 rounded-md"
            >
              Post Tuition
            </button> */}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
