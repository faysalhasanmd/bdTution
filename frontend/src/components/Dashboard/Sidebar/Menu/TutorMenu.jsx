import { FcStatistics } from "react-icons/fc";
import { VscGitStashApply } from "react-icons/vsc";
import { MdOutlineWorkHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
import { TbReportMoney } from "react-icons/tb";

const TutorMenu = () => {
  return (
    <>
      <MenuItem
        icon={FcStatistics}
        label="TutorStatistics"
        address="tutor-statistics"
      />
      <MenuItem
        icon={VscGitStashApply}
        label="My Applied Tuition"
        address="my-applied-tuition"
      />
      <MenuItem
        icon={TbReportMoney}
        label="Tutor Ongoing Tuitions"
        address="tutor-ongoing-tuitions"
      />
      <MenuItem
        icon={MdOutlineWorkHistory}
        label="Revenue History"
        address="revenue-history"
      />
    </>
  );
};

export default TutorMenu;
