import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

const UpdateUserRoleModal = ({
  isOpen,
  closeModal,
  role,
  userEmail,
  fetchUsers,
}) => {
  const [updatedRole, setUpdatedRole] = useState(role);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://bdtutionsf.vercel.app/users/role/${userEmail}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ role: updatedRole }),
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        fetchUsers(); // Refresh table
        closeModal();
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle as="h3" className="text-base font-medium text-black">
              Update User Role
            </DialogTitle>
            <div className="mt-3">
              <select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                className="w-full my-3 border border-gray-200 rounded-xl px-2 py-3"
              >
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="flex mt-2 justify-around">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="cursor-pointer inline-flex justify-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer inline-flex justify-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModal;
