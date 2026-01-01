document.addEventListener("DOMContentLoaded", function () {
  // Active Sidebar Link on Scroll
  const sections = document.querySelectorAll(".page");
  const sidebarLinks = document.querySelectorAll("#sidebar a");

  function onScroll() {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    
    sections.forEach(function (section) {
      const offsetTop = section.offsetTop;
      const height = section.offsetHeight;
      if (
        scrollPosition >= offsetTop - 50 &&
        scrollPosition < offsetTop + height - 50
      ) {
        // Clear active state for all links
        sidebarLinks.forEach(function (link) {
          link.classList.remove("active");
        });

        // Set active state for the current section's link
        const id = section.getAttribute("id");
        const activeLink = document.querySelector(`#sidebar a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  // Stats Modal Feature
  const modal = document.getElementById("stats-modal");
  if (modal) {
    const closeModal = modal.querySelector(".close");

    // Show the modal after 3 seconds
    setTimeout(function () {
      modal.style.display = "block";
    }, 3000);

    if (closeModal) {
      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
