import { ScaleLoader } from "react-spinners";
import { useTheme } from "../../context/ThemeContext";

const LoadingSpinner = ({ smallHeight }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${smallHeight ? "h-[250px]" : "h-[70vh]"}
        flex flex-col justify-center items-center`}
    >
      <ScaleLoader size={100} color={darkMode ? "#818cf8" : "black"} />
    </div>
  );
};

export default LoadingSpinner;
