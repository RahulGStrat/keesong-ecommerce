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

   // category click
   if (categoryBtn) {
      categoryBtn.addEventListener("click", (e) => {
         e.preventDefault();
         categoryBtn.classList.toggle("active");

         if (window.innerWidth > 768) {
            megaMenu?.classList.toggle("active");
            megaMenu?.classList.remove("mobile");
         } else {
            overlay?.classList.add("active");
            megaMenu?.classList.add("active", "mobile");
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
