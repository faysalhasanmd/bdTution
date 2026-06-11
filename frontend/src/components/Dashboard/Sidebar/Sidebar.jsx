import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import logo from "../../../assets/images/bd-tuition.png";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import TutorMenu from "./Menu/TutorMenu";
import StudentMenu from "./Menu/StudentMenu";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  alwaysShowOnDesktop = false,
}) => {
  const { logOut } = useAuth();
  const [role, loading] = useRole();
  if (loading) return null;

  return (
    <div
      className={`
        z-30 fixed flex flex-col justify-between overflow-x-hidden
        bg-gray-100 w-64 space-y-6 px-2 py-4
        top-16 bottom-0 left-0 transform transition duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${alwaysShowOnDesktop ? "lg:translate-x-0" : ""}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="w-full flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src={logo} alt="logo" width="100" height="100" />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {role?.toLowerCase() === "student" && (
              <StudentMenu onNavigate={() => setSidebarOpen(false)} />
            )}
            {role?.toLowerCase() === "tutor" && (
              <TutorMenu onNavigate={() => setSidebarOpen(false)} />
            )}
            {role?.toLowerCase() === "admin" && (
              <AdminMenu onNavigate={() => setSidebarOpen(false)} />
            )}
          </nav>
        </div>

        {/* Bottom */}
        <div>
          <hr />
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
          />
          <button
            onClick={logOut}
            className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
