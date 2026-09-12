"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LucideMoon,LucideSun } from "lucide-react";

const ThemeToggler = () => {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(currentTheme === "dark" ? "light" : "dark")
      }
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
    >
      {currentTheme === "dark" ? (
        <LucideSun className="h-5 w-5" />
      ) : (
        <LucideMoon className="h-5 w-5 text-black" />
      )}
    </button>
  );
};

export default ThemeToggler;