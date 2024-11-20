document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll function
  function smoothScroll(targetPosition) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 150;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        smoothScroll(offsetPosition);

        // Close mobile menu if open
        const burgerIcon = document.querySelector(".burger-icon");
        const navLinks = document.querySelector(".nav-links");
        burgerIcon.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScroll(0);
  });

  document.querySelector(".burger-menu").addEventListener("click", function () {
    this.querySelector(".burger-icon").classList.toggle("active");
    document.querySelector(".nav-links").classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelector(".burger-icon").classList.remove("active");
      document.querySelector(".nav-links").classList.remove("active");
    });
  });

  // Update the scroll event listener
  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY === 0) {
      nav.classList.add("at-top");
    } else {
      nav.classList.remove("at-top");
    }
  });

  const nav = document.querySelector("nav");
  if (window.scrollY === 0) {
    nav.classList.add("at-top");
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(400, 400);
  document.getElementById('cube-container').appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(2, 32, 32);
  

  const colors = [
    0x0077b6,
    0x48cae4, 
    0x90e0ef, 
    0xe6f3ff,
    0x00b4d8  
  ];
  
  let colorIndex = 0;

  const material = new THREE.MeshBasicMaterial({
    color: colors[colorIndex],
    transparent: true,
    opacity: 0.6, 
    wireframe: true
  });
  
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.003;

    const progress = (sphere.rotation.y % (2 * Math.PI)) / (2 * Math.PI);
    const nextColorIndex = (colorIndex + 1) % colors.length;
    const currentColor = new THREE.Color(colors[colorIndex]);
    const nextColor = new THREE.Color(colors[nextColorIndex]);

    material.color.lerpColors(currentColor, nextColor, progress);

    if (sphere.rotation.y >= 2 * Math.PI) {
      sphere.rotation.y = 0;
      colorIndex = nextColorIndex;
    }

    renderer.render(scene, camera);
  }

  animate();

  function placeClouds() {
    const cloudContainer = document.querySelector('.cloud-container');
    const existingClouds = cloudContainer.querySelectorAll('.floating-cloud');
    
    existingClouds.forEach(cloud => {
      // Random position 
      cloud.style.left = `${Math.random() * 60}%`; 
      cloud.style.top = `${Math.random() * 60}%`;
      
      // size range between 250px and 450px
      const size = 250 + Math.random() * 200;
      cloud.style.width = `${size}px`;
      
      // opacity 0.5 and 0.8
      cloud.style.opacity = 0.5 + Math.random() * 0.3;
      
      // blur for softer edges
      cloud.style.filter = `blur(${3 + Math.random() * 2}px)`;
    });
  }

  // Place clouds when page loads
  document.addEventListener('DOMContentLoaded', placeClouds());
});