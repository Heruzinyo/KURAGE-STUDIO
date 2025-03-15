// Theme toggle functionality
const initThemeToggle = () => {
  // Theme management functions
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Get the base URL for the repository
    const getBaseUrl = () => {
      // Extract the repository base URL from the current location
      const pathParts = window.location.pathname.split('/');
      // For GitHub Pages with format username.github.io/repo-name/
      const repoName = "KURAGE-STUDIO"; // Your repository name
      
      // Find where the repo name appears in the path
      const repoIndex = pathParts.findIndex(part => part === repoName);
      
      if (repoIndex !== -1) {
        // Reconstruct the base path up to and including the repo name
        return pathParts.slice(0, repoIndex + 1).join('/') + '/';
      }
      
      // Fallback to root if structure doesn't match expected pattern
      return '/';
    };

    const baseUrl = getBaseUrl();
    
    // Update all theme toggle icons with absolute paths from repository root
    document.querySelectorAll(".theme-toggle img").forEach((img) => {
      img.src =
        theme === "dark"
          ? `${baseUrl}assets/files/svg/Sun.svg`
          : `${baseUrl}assets/files/svg/Moon.svg`;
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