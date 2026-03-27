
// document.addEventListener("DOMContentLoaded", function () {

//   const categoryBtn = document.querySelector(".kse-Head__menu-item--category");
//   const megaWrap = document.querySelector(".kse-Head__megaWrap");

//   categoryBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     this.classList.toggle("active");
//     megaWrap.classList.toggle("active");
//   });

//   // Close on outside click
//   document.addEventListener("click", function (e) {
//     if (!categoryBtn.contains(e.target) && !megaWrap.contains(e.target)) {
//       categoryBtn.classList.remove("active");
//       megaWrap.classList.remove("active");
//     }
//   });

// });



// MENU START HERE====================================================

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const categoryBtn = document.getElementById("categoryBtn");

const megaMenu = document.getElementById("megaMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

// hamburger
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active"); //
});

// category click
categoryBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (window.innerWidth > 768) {
    // desktop
    megaMenu.classList.toggle("active");
    megaMenu.classList.remove("mobile");
  } else {
    // mobile popup
    overlay.classList.add("active");
    megaMenu.classList.add("active", "mobile");
  }
});

// close popup
function closeMenu() {
  overlay.classList.remove("active");
  megaMenu.classList.remove("active", "mobile");
}

overlay.addEventListener("click", closeMenu);
closeBtn.addEventListener("click", closeMenu);

// accordion
document.querySelectorAll(".kse-Head__mega-col h4").forEach(title => {
  title.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const current = title.parentElement;

      document.querySelectorAll(".kse-Head__mega-col").forEach(col => {
        if (col !== current) col.classList.remove("active");
      });

      current.classList.toggle("active");
    }
  });
});

// outside click (desktop)
document.addEventListener("click", (e) => {
  if (!e.target.closest("#categoryBtn") && !e.target.closest("#megaMenu")) {
    megaMenu.classList.remove("active");
  }
});

// resize reset
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    overlay.classList.remove("active");
    megaMenu.classList.remove("mobile");
  }
});

// MENU END HERE====================================================


