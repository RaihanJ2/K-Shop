import React, { MouseEvent } from "react";
import { useTheme } from "../../context/ThemeContext";

const RippleButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDarkMode } = useTheme();
  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");

    // Set ripple styles
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = isDarkMode ? "white" : "black";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-effect 0.6s linear";
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.style.opacity = "0.2";

    // Add ripple to button
    button.appendChild(ripple);

    // Remove ripple after animation
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <button
      className="uppercase hover:scale-105 duration-200 text-center p-2 relative overflow-hidden border-2 bg-white dark:bg-transparent border-black dark:border-white text-black dark:text-white px-4 py-2 rounded-md focus:outline-none"
      onClick={handleRipple}
    >
      {children}
    </button>
  );
};

export default RippleButton;
