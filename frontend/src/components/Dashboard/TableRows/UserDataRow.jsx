import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";

const UserDataRow = ({ user, fetchUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log(user);
  return (
    <tr>
      {/* Profile Image */}

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          loading="lazy"
          src={user.image || "/default-avatar.png"} // default image
          alt={user.email}
          className="w-10 h-10 rounded-full mx-auto"
        />
      </td>

      {/* Email */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{user.email}</p>
      </td>

      {/* Role */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{user.role}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p>{user.status || "Available"}</p>
      </td>

      {/* Update Role */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>

        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          role={user.role}
          userEmail={user.email}
          fetchUsers={fetchUsers}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
