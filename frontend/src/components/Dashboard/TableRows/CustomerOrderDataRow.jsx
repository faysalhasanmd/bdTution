import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModel from "./DeleteModel";
import EditModal from "./EditModal";

const CustomerOrderDataRow = ({ item, refetch }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const closeDeleteModal = () => setIsDeleteOpen(false);
  const closeEditModal = () => setIsEditOpen(false);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://bdtuitions.vercel.app/tuition/${item._id}`,
      );

      if (data.deletedCount === 1) {
        toast.success("Deleted Successfully!");
        closeDeleteModal();
        refetch();
      } else {
        toast.error("Delete failed!");
      }
    } catch (error) {
      toast.error("Delete Failed!", error);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5  bg-white">
        <img loading="lazy" src={item.image} className="h-12 w-12 rounded" />
      </td>

      <td className="px-5 py-5 border-b bg-white">{item.studentName}</td>
      <td className="px-5 py-5 border-b bg-white">{item.subject}</td>
      <td className="px-5 py-5 border-b bg-white">{item.budget} Tk</td>
      <td className="px-5 py-5 border-b bg-white">{item.schedule}</td>
      <td className="px-5 py-5 border-b bg-white">{item.status}</td>

      <td className="px-5 py-7  bg-white flex gap-2">
        <button
          onClick={() => setIsEditOpen(true)}
          className=" p-3 mt-3 text-center font-medium text-white bg-lime-500 rounded-md"
        >
          Edit
        </button>

        <button
          onClick={() => setIsDeleteOpen(true)}
          className=" p-3 mt-3 text-center font-medium text-white bg-red-300 rounded-md"
        >
          Delete
        </button>

        <DeleteModel
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
          confirm={handleDelete}
        />

        <EditModal
          isOpen={isEditOpen}
          closeModal={closeEditModal}
          item={item}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
