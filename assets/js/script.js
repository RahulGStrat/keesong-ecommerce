// =========================
// MAIN INIT
// =========================
document.addEventListener("DOMContentLoaded", function () {
   initMenu();
   initRecipeSlider();
   initSort();
   initFilter();
   initPDP();
   initGreatWithToggle();
   initHeaderDropdown();
   initLoginTabs();
   initPasswordToggle();
   initRecipePopupSlider();
   initGreatChickenSlider();
   initFavouriteRecipesSlider();
   initRelatedProductsSlider();
});

// =========================
// MENU
// =========================
function initMenu() {
   const hamburger = document.getElementById("hamburger");
   const menu = document.getElementById("menu");
   const overlay = document.getElementById("overlay");
   const closeBtn = document.getElementById("closeBtn");

   // Select ALL dropdown toggles based on your existing classes
   // This grabs the <a> tag directly inside the category/dropdown <li>
   const dropdownToggles = document.querySelectorAll(
      ".kse-Head__menu-item--category > a",
   );

   if (!hamburger || !menu) return;

   // Hamburger Menu Logic
   hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
   });

   // Handle ALL Dropdown Clicks
   dropdownToggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
         e.preventDefault();

         // The dropdown menu is the next sibling element after the <a> tag
         const megaMenu = btn.nextElementSibling;
         const isOpen = btn.classList.contains("active");

         // Close everything first so we don't have multiple menus open
         closeAllMenus();

         // If the clicked menu wasn't already open, open it now
         if (!isOpen && megaMenu) {
            btn.classList.add("active");

            if (window.innerWidth > 769) {
               megaMenu.classList.add("active");
               megaMenu.classList.remove("mobile");
            } else {
               overlay?.classList.add("active");
               megaMenu.classList.add("active", "mobile");
            }
         }
      });
   });

   // Helper function to close all dropdowns at once
   function closeAllMenus() {
      overlay?.classList.remove("active");

      // Remove active states from all buttons
      dropdownToggles.forEach((btn) => btn.classList.remove("active"));

      // Remove active states from all dropdown submenus
      document.querySelectorAll(".kse-Head__menu-sub").forEach((menu) => {
         menu.classList.remove("active", "mobile");
      });
   }

   overlay?.addEventListener("click", closeAllMenus);
   closeBtn?.addEventListener("click", closeAllMenus);

   // Accordion logic (Mobile)
   document.querySelectorAll(".kse-Head__mega-col h4").forEach((title) => {
      title.addEventListener("click", () => {
         if (window.innerWidth <= 768) {
            const current = title.parentElement;

            document.querySelectorAll(".kse-Head__mega-col").forEach((col) => {
               if (col !== current) col.classList.remove("active");
            });

            current.classList.toggle("active");
         }
      });
   });

   // Outside click handler
   document.addEventListener("click", (e) => {
      // If the user clicks outside of any dropdown wrapper, close all menus
      if (!e.target.closest(".kse-Head__menu-item--category")) {
         closeAllMenus();
      }
   });

   // Resize reset
   window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
         overlay?.classList.remove("active");
         document.querySelectorAll(".kse-Head__menu-sub").forEach((menu) => {
            menu.classList.remove("mobile");
         });
      }
   });
}

// =========================
// RECIPE SLIDER
// =========================
function initRecipeSlider() {
   const $slider = $(".kse-recipe-slider__track");

   if (!$slider.length) return;

   $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      dots: false,

      prevArrow: $(".kse-arrow--prev"),
      nextArrow: $(".kse-arrow--next"),

      responsive: [
         {
            breakpoint: 1024,
            settings: { slidesToShow: 3 },
         },
         {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
         },
         {
            breakpoint: 480,
            settings: { slidesToShow: 1 },
         },
      ],
   });
}

// =========================
// SORT
// =========================
function initSort() {
   const buttons = document.querySelectorAll(".kse-sort__btn");
   if (!buttons.length) return;

   buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
         buttons.forEach((b) => b.classList.remove("active"));
         btn.classList.add("active");
      });
   });
}

// =========================
// FILTER
// =========================
function initFilter() {
   if (!$(".kse-filter__listitm").length) return;

   $(".kse-filter__listitm").on("click", function () {
      $(".kse-filter__listitm").removeClass("active");
      $(this).addClass("active");
   });
}

// =========================
// PDP (IMAGE + ZOOM)
// =========================
function initPDP() {
   const mainImage = document.getElementById("mainProductImage");
   const thumbnails = document.querySelectorAll(".thumb");
   const container = document.getElementById("zoomContainer");

   // thumbnail switch
   if (mainImage && thumbnails.length) {
      thumbnails.forEach((thumb) => {
         thumb.addEventListener("click", function () {
            mainImage.src = this.src;

            thumbnails.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");
         });
      });
   }

   // zoom
   if (container && mainImage) {
      container.addEventListener("mousemove", function (e) {
         const rect = container.getBoundingClientRect();

         const x = ((e.clientX - rect.left) / rect.width) * 100;
         const y = ((e.clientY - rect.top) / rect.height) * 100;

         mainImage.style.transformOrigin = `${x}% ${y}%`;
         mainImage.style.transform = "scale(2)";
      });

      container.addEventListener("mouseleave", function () {
         mainImage.style.transform = "scale(1)";
         mainImage.style.transformOrigin = "center";
      });
   }
}

// =========================
// PDP / ARTICLE TOGGLE
// =========================
function initGreatWithToggle() {
   const toggleBtns = document.querySelectorAll(
      ".kse-greatwith .toggle-icon, .kse-article__sidebar .toggle-icon",
   );

   if (!toggleBtns.length) return;

   toggleBtns.forEach((toggleBtn) => {
      const parent = toggleBtn.closest(".kse-greatwith, .kse-article__sidebar");
      const list = parent.querySelector(
         ".kse-greatwith__list, .kse-article__sidebar-list",
      );

      if (!list) return;

      let isOpen = true;

      toggleBtn.addEventListener("click", function (e) {
         e.preventDefault();

         isOpen = !isOpen;
         list.style.display = isOpen ? "" : "none";
         toggleBtn.classList.toggle("rotated", !isOpen);
      });
   });
}

// =========================
// HEADER USER DROPDOWN
// =========================
function initHeaderDropdown() {
   const userToggle = document.getElementById("headeruserToggle");
   const dropdown = document.getElementById("headeruserDropdown");

   // safety check (important)
   if (!userToggle || !dropdown) return;

   userToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("active");
   });

   document.addEventListener("click", function () {
      dropdown.classList.remove("active");
   });
}

// =========================
// AFTER 5 PRODUCT DIVIDER
// =========================
// function insertDividers() {
//   const products = document.querySelectorAll('#product-list .kse-PdTile');

//   products.forEach((product, index) => {
//     if ((index + 1) % 5 === 0 && (index + 1) !== products.length) {
//       const div = document.createElement('div');
//       div.className = 'custom-divider';
//       div.innerHTML = '';

//       product.after(div);
//     }
//   });
// }

// // run only on desktop
// if (window.innerWidth >= 769) {
//   insertDividers();
// }

// ========================================CALANDER===========================================
const monthYear = document.getElementById("kse-monthYear");
const datesContainer = document.getElementById("kse-dates");

let currentDate = new Date();
let selectedDate = null; // single selected date

function isSelected(year, month, day) {
   return (
      selectedDate &&
      selectedDate.year === year &&
      selectedDate.month === month &&
      selectedDate.day === day
   );
}

function selectDate(year, month, day) {
   selectedDate = { year, month, day };
}

function renderCalendar() {
   datesContainer.innerHTML = "";

   const year = currentDate.getFullYear();
   const month = currentDate.getMonth();

   const today = new Date();
   const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;

   const firstDay = new Date(year, month, 1).getDay();
   const lastDate = new Date(year, month + 1, 0).getDate();
   const prevLastDate = new Date(year, month, 0).getDate();

   const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
   ];
   monthYear.innerText = months[month] + " " + year;

   /* PREV DAYS */
   for (let i = firstDay; i > 0; i--) {
      const div = document.createElement("div");
      div.classList.add("kse-muted");
      div.innerText = prevLastDate - i + 1;
      datesContainer.appendChild(div);
   }

   /* CURRENT MONTH */
   for (let i = 1; i <= lastDate; i++) {
      const wrapper = document.createElement("div");
      const inner = document.createElement("div");

      inner.classList.add("kse-date");
      inner.innerText = i;

      // TODAY
      if (isCurrentMonth && i === today.getDate()) {
         inner.classList.add("kse-today");
      }

      // ACTIVE (single select)
      if (isSelected(year, month, i)) {
         inner.classList.add("active");
      }

      // CLICK
      inner.addEventListener("click", () => {
         selectDate(year, month, i);
         renderCalendar();
      });

      wrapper.appendChild(inner);
      datesContainer.appendChild(wrapper);
   }

   /* NEXT DAYS */
   const total = datesContainer.children.length;
   const nextDays = 42 - total;

   for (let i = 1; i <= nextDays; i++) {
      const div = document.createElement("div");
      div.classList.add("kse-muted");
      div.innerText = i;
      datesContainer.appendChild(div);
   }
}

/* NAVIGATION */
document.getElementById("kse-prev").onclick = () => {
   currentDate.setMonth(currentDate.getMonth() - 1);
   renderCalendar();
};

document.getElementById("kse-next").onclick = () => {
   currentDate.setMonth(currentDate.getMonth() + 1);
   renderCalendar();
};

renderCalendar();
// authentication tab script
function initLoginTabs() {
   const tabs = document.querySelectorAll(".kse-login__tabs .tab");
   const contents = document.querySelectorAll(".kse-login__content");

   if (!tabs.length || !contents.length) return;

   tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
         tabs.forEach((t) => t.classList.remove("active"));
         contents.forEach((c) => c.classList.remove("active"));

         tab.classList.add("active");

         const target = document.getElementById(tab.dataset.tab);
         if (target) target.classList.add("active");
      });
   });
}
// authentication eye_toggle script
function initPasswordToggle() {
   const toggles = document.querySelectorAll(".kse-login__toggleye");

   if (!toggles.length) return;

   toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
         const input = toggle.previousElementSibling;

         if (!input) return;

         // Toggle input type
         input.type = input.type === "password" ? "text" : "password";

         // Toggle icon state
         toggle.classList.toggle("active");
      });
   });
}
// Recipe popup slider
function initRecipePopupSlider() {
   const $wrapper = $(".kse-recipe-popup__slider");

   if (!$wrapper.length) return;

   const $slider = $wrapper.find(".kse-recipe-popup__slidertrack");

   if (!$slider.length) return;

   if ($slider.hasClass("slick-initialized")) return;

   $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      dots: false,

      prevArrow: $wrapper.find(".kse-arrow--prev"),
      nextArrow: $wrapper.find(".kse-arrow--next"),

      responsive: [
         {
            breakpoint: 1024,
            settings: { slidesToShow: 3 },
         },
         {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
         },
         {
            breakpoint: 480,
            settings: { slidesToShow: 1 },
         },
      ],
   });
}
// =========================================
// GREAT CHICKEN SLIDER
// =========================================

function initGreatChickenSlider() {
   const $slider = $(".kse-great-chicken__slider");

   if (!$slider.length) return;

   $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      dots: false,
      speed: 600,
      prevArrow: $(".kse-great-chicken__arrow--prev"),
      nextArrow: $(".kse-great-chicken__arrow--next"),

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });
}

// =========================================
// FAVOURITE RECIPES SLIDER
// =========================================

function initFavouriteRecipesSlider() {
   const $wrapper = $(".kse-favourite-recipes__slider");

   if (!$wrapper.length) return;

   const $slider = $wrapper.find(".kse-favourite-recipes__slidertrack");

   if (!$slider.length) return;

   if ($slider.hasClass("slick-initialized")) return;

   $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 800,
      arrows: true,
      dots: false,

      prevArrow: $(".kse-favourite-recipes__arrow--prev"),
      nextArrow: $(".kse-favourite-recipes__arrow--next"),

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });
}
// =========================================
// RELATED PRODUCTS SLIDER
// =========================================

function initRelatedProductsSlider() {
   const $wrapper = $(".kse-related-products__wrapper");

   if (!$wrapper.length) return;

   const $slider = $wrapper.find(".kse-related-products__slider");

   if (!$slider.length) return;

   if ($slider.hasClass("slick-initialized")) return;

   $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 800,
      arrows: true,
      dots: false,

      prevArrow: $(".kse-related-products__arrow--prev"),
      nextArrow: $(".kse-related-products__arrow--next"),

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });
}
