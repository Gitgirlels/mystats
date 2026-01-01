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

  // Particle Background Effect
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context not available.");
    return;
  }

  let particlesArray = [];
  const numberOfParticles = 100;

  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "rgba(255, 255, 255, 0.8)";

    this.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap particles around the edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    };

    this.draw = function () {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  initParticles();

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(function (p) {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
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
