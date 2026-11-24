// BAPPY PORTFOLIO — INTERACTIONS

// Dark / light theme
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("bappy-theme");
if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("bappy-theme", theme);
  updateThemeIcon();
});

// Typing animation
const typingText = document.getElementById("typingText");
const words = ["Hardworking Professional", "Team Player", "Fast Learner", "Adaptable Person", "Future Professional"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const word = words[wordIndex];
  typingText.textContent = deleting ? word.substring(0, charIndex - 1) : word.substring(0, charIndex + 1);
  charIndex += deleting ? -1 : 1;
  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex === word.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }
  window.setTimeout(typeEffect, delay);
}
if (typingText) typeEffect();

// Reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Scroll progress and back-to-top
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

function updateScrollUI() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle("show", window.scrollY > 450);
}

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollUI();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
updateScrollUI();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
