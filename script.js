const typing = document.getElementById("typing");
const phrases = ["Software Developer in Progress", "Exploring AI & Machine Learning", "Turning Ideas Into Projects"];
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[phraseIndex];
  typing.textContent = phrase.slice(0, charIndex);
  if (!deleting && charIndex < phrase.length) { charIndex++; setTimeout(typeLoop, 72); }
  else if (!deleting) { deleting = true; setTimeout(typeLoop, 1500); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeLoop, 32); }
  else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeLoop, 300); }
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + "%";
  const sections = [...document.querySelectorAll("main section[id]")];
  let current = "home";
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 160) current = section.id; });
  document.querySelectorAll("#navLinks a").forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

const terminalMessages = ["Building something useful...", "Learning. Building. Improving.", "One commit at a time."];
let terminalIndex = 0;
setInterval(() => {
  terminalIndex = (terminalIndex + 1) % terminalMessages.length;
  const terminal = document.getElementById("terminalText");
  terminal.style.opacity = 0;
  setTimeout(() => { terminal.textContent = terminalMessages[terminalIndex]; terminal.style.opacity = 1; }, 250);
}, 2800);
