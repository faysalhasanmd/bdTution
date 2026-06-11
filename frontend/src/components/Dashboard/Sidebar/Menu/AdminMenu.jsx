import { FaUserCog } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

import { TbReportAnalytics } from "react-icons/tb";

import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FcStatistics}
        label="Admin Statistics"
        address="admin-statistics"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Student Post"
        address="manage-student-post"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={TbReportAnalytics}
        label="Reports & Analytics"
        address="reports-analytics"
      />
      <MenuItem
        icon={CgProfile}
        label="Profile Setting"
        address="profile-setting"
      />
    </>
  );
};

export default AdminMenu;
