// Modified Search Function
function filterProjects(searchTerm) {
  const activeFilter = document.querySelector("[data-filter-btn].active").textContent.trim().toLowerCase();
  const allProjectItems = document.querySelectorAll(".project-item");

  allProjectItems.forEach(function (item) {
    const projectName = item.querySelector(".project-title").textContent.toLowerCase();
    const projectCategory = item.dataset.category.toLowerCase();

    const matchesSearch = projectName.includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "tudo" || projectCategory === activeFilter;

    item.style.display = matchesSearch && matchesFilter ? "block" : "none";
  });
}

// Search Input Event
document.querySelector(".search-bar").addEventListener("input", function (event) {
  filterProjects(event.target.value);
});

// Handle both desktop and mobile filter buttons
const filterButtons = document.querySelectorAll("[data-filter-btn], [data-select-item]");
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const filterValue = this.textContent.trim().toLowerCase();

    // Update desktop filter buttons
    document.querySelectorAll("[data-filter-btn]").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.textContent.trim().toLowerCase() === filterValue) {
        btn.classList.add("active");
      }
    });

    // Update mobile select display
    const selectValueElement = document.querySelector("[data-selecct-value]");
    if (selectValueElement) {
      selectValueElement.textContent = this.textContent.trim();
    }

    // Trigger filter
    const searchTerm = document.querySelector(".search-bar").value;
    filterProjects(searchTerm);
  });
});

document.querySelector(".search-bar").addEventListener("input", function (event) {
  const searchTerm = event.target.value;
  filterProjects(searchTerm);
});