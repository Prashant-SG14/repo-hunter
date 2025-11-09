import { useState, useEffect } from "react";

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "light" : "dark",
    );
  }, [isLight]);

  return (
    <div
      id="theme-toggle"
      onClick={() => setIsLight(!isLight)}
      className="text-text border rounded-[5rem] w-24 h-10 bg-bg-sec flex items-center transition-colors hover:bg-accent"
    >
      <div
        id="switch"
        className={`bg-text w-8 h-8 rounded-full ml-1 transition-transform duration-300 ${isLight ? "translate-x-14" : "translate-x-0"}`}
      ></div>
    </div>
  );
}

export default ThemeToggle;
