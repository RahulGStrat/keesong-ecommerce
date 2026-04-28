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
});

// =========================
// MENU
// =========================
function initMenu() {
   const hamburger = document.getElementById("hamburger");
   const menu = document.getElementById("menu");
   const categoryBtn = document.getElementById("categoryBtn");
   const megaMenu = document.getElementById("megaMenu");
   const overlay = document.getElementById("overlay");
   const closeBtn = document.getElementById("closeBtn");

   if (!hamburger || !menu) return;

   // hamburger
   hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
   });

   document.querySelectorAll(".kse-Head__menu-sub").forEach((submenu) => {
      submenu.addEventListener("click", (e) => {
         if (window.innerWidth <= 768) {
            e.stopPropagation();

            // toggle mobile active
            submenu.classList.toggle("mobile");
            submenu.classList.toggle("active");
         }
      });
   });
   // category click
   if (categoryBtn) {
      categoryBtn.addEventListener("click", (e) => {
         e.preventDefault();

         const isOpen = megaMenu?.classList.contains("active");

         if (isOpen) {
            // CLOSE
            closeMenu();
         } else {
            // OPEN
            categoryBtn.classList.add("active");

            if (window.innerWidth > 769) {
               megaMenu?.classList.add("active");
               megaMenu?.classList.remove("mobile");
            } else {
               overlay?.classList.add("active");
               megaMenu?.classList.add("active", "mobile");
            }
         }
      });
   }

   function closeMenu() {
      overlay?.classList.remove("active");
      megaMenu?.classList.remove("active", "mobile");
      categoryBtn?.classList.remove("active");
   }

   overlay?.addEventListener("click", closeMenu);
   closeBtn?.addEventListener("click", closeMenu);

   // accordion
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

   // outside click
   document.addEventListener("click", (e) => {
      if (!e.target.closest("#categoryBtn") && !e.target.closest("#megaMenu")) {
         megaMenu?.classList.remove("active");
         categoryBtn?.classList.remove("active");
      }
   });

   // resize reset
   window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
         overlay?.classList.remove("active");
         megaMenu?.classList.remove("mobile");
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
// PDP TOGGLE
// =========================
function initGreatWithToggle() {
   const toggleBtn = document.querySelector(".kse-greatwith .toggle-icon");
   const list = document.querySelector(".kse-greatwith__list");

   if (!toggleBtn || !list) return;

   let isOpen = true;

   toggleBtn.addEventListener("click", function (e) {
      e.preventDefault();

      isOpen = !isOpen;
      list.style.display = isOpen ? "flex" : "none";
      toggleBtn.classList.toggle("rotated", !isOpen);
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
