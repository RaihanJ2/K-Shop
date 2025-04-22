import { useTheme } from "../context/ThemeContext";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="flex items-center justify-center w-16 h-10 rounded-full duration-300 transition-all bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <i className="translate-x-3 before:rotate-180 fa-solid fa-moon text-xl rotate-0 duration-200"></i>
      ) : (
        <i className="-translate-x-3 before:rotate-180 fa-solid fa-sun text-xl rotate-180 duration-200"></i>
      )}
    </button>
  );
};

export default DarkModeToggle;
