import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const setTo = isDark ? "dark" : "light";
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    localStorage.setItem("theme", setTo);
  }, [isDark]);

  return [isDark, setIsDark];
}
