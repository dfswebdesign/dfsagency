//Scroll Function on header to change color
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  if (scrollPos > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//Remove navigation menu on Click
const navButton = document.getElementById("menu-btn");
const navLinks = document.querySelectorAll(".nav-link");

Array.from(navLinks).forEach((link) =>
  link.addEventListener("click", () => {
    navButton.checked = false;
  })
);
