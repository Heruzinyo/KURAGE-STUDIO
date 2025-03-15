// Theme toggle functionality
const initThemeToggle = () => {
  // Theme management functions
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update all theme toggle icons
    document.querySelectorAll(".theme-toggle img").forEach((img) => {
      img.src =
        theme === "dark"
          ? "/assets/files/svg/Sun.svg"
          : "/assets/files/svg/Moon.svg";
    });
  };

  // System theme detection
  const detectSystemTheme = () => {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Initial theme setup
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme || detectSystemTheme());
  };

  // System theme change listener
  window
    .matchMedia?.("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Click handler for all theme toggles
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme === "light" ? "dark" : "light");
    });
  });

  // Initialize
  initTheme();
};

document.addEventListener("DOMContentLoaded", initThemeToggle);