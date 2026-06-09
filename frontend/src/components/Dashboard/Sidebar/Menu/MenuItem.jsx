import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 rounded-lg transition-colors duration-200
        hover:bg-gray-200 dark:hover:bg-gray-700
        hover:text-gray-900 dark:hover:text-white
        ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
            : "text-gray-600 dark:text-gray-300"
        }`
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
