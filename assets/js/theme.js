// Theme toggle functionality
const initThemeToggle = () => {
  // Theme management functions
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Determine base path
    const getBasePath = () => {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // If we're in a subdirectory (has additional slashes after the domain)
      if (currentPath.split('/').length > 2) {
        // Count the number of directory levels from root
        const levels = currentPath.split('/').filter(Boolean).length;
        // Build the relative path prefix based on directory depth
        return '../'.repeat(levels - 1);
      } else {
        // We're at the root level
        return './';
      }
    };

    const basePath = getBasePath();
    
    // Update all theme toggle icons
    document.querySelectorAll(".theme-toggle img").forEach((img) => {
      img.src =
        theme === "dark"
          ? `${basePath}assets/files/svg/Sun.svg`
          : `${basePath}assets/files/svg/Moon.svg`;
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