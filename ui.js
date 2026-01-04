const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.theme === "dark") {
  root.setAttribute("data-theme", "dark");
  toggle.innerText = "☀️ Light Mode";
}

toggle.onclick = () => {
  if (root.getAttribute("data-theme") === "dark") {
    root.removeAttribute("data-theme");
    localStorage.theme = "light";
    toggle.innerText = "🌙 Dark Mode";
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.theme = "dark";
    toggle.innerText = "☀️ Light Mode";
  }
};
