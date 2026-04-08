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
   initTimelineSVG();
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
         categoryBtn.classList.toggle("active");

         if (window.innerWidth > 769) {
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

// =========================
// AFTER 5 PRODUCT DIVIDER
// =========================
function insertDividers() {
   const products = document.querySelectorAll("#product-list .kse-PdTile");

   products.forEach((product, index) => {
      if ((index + 1) % 5 === 0 && index + 1 !== products.length) {
         const div = document.createElement("div");
         div.className = "custom-divider";
         div.innerHTML = "";

         product.after(div);
      }
   });
}

// run only on desktop
if (window.innerWidth >= 769) {
   insertDividers();
}

// ================================
// TIMELINE SVG
// ================================
function initTimelineSVG() {
   const grid = document.getElementById("kse-timeline__grid");
   const svgContainer = document.getElementById("timeline-svg-container");

   if (!grid || !svgContainer) return;

   function drawSVGs() {
      svgContainer.innerHTML = "";

      const items = Array.from(
         document.querySelectorAll(".kse-timeline__item"),
      );
      if (items.length === 0) return;

      const gridRect = grid.getBoundingClientRect();

      // Group items by row
      const rows = [];
      let currentRowTop = items[0].getBoundingClientRect().top;
      let currentGroup = [];

      items.forEach((item) => {
         const rect = item.getBoundingClientRect();
         if (Math.abs(rect.top - currentRowTop) > 20) {
            rows.push(currentGroup);
            currentGroup = [];
            currentRowTop = rect.top;
         }
         currentGroup.push(item);
      });
      if (currentGroup.length > 0) rows.push(currentGroup);

      const bounds = rows.map((rowItems) => {
         const dot = rowItems[0].querySelector(".kse-timeline__dot");
         const dotRect = dot.getBoundingClientRect();
         const dotCenterY = dotRect.top + dotRect.height / 2 - gridRect.top;

         return { dotCenterY };
      });

      const paddingX = 40;
      const leftBoundary = 0 - paddingX;
      const rightBoundary = gridRect.width + paddingX;

      const wrapper = document.querySelector(".kse-timeline__wrap");
      const wrapperRect = wrapper.getBoundingClientRect();
      const screenStartX = -wrapperRect.left;
      const screenEndX = window.innerWidth - wrapperRect.left;

      const r = 30;
      let d = "";

      for (let i = 0; i < bounds.length; i++) {
         const isRTL = i % 2 !== 0;
         const current = bounds[i];
         const next = bounds[i + 1];

         const y = current.dotCenterY;

         if (i === 0) {
            d += `M ${screenStartX} ${y} `;
         }

         if (!isRTL) {
            if (next) {
               d += `L ${rightBoundary - r} ${y} `;
               const nextY = next.dotCenterY;
               d += `Q ${rightBoundary} ${y} ${rightBoundary} ${y + r} `;
               d += `L ${rightBoundary} ${nextY - r} `;
               d += `Q ${rightBoundary} ${nextY} ${rightBoundary - r} ${nextY} `;
            } else {
               d += `L ${screenEndX} ${y} `;
            }
         } else {
            if (next) {
               d += `L ${leftBoundary + r} ${y} `;
               const nextY = next.dotCenterY;
               d += `Q ${leftBoundary} ${y} ${leftBoundary} ${y + r} `;
               d += `L ${leftBoundary} ${nextY - r} `;
               d += `Q ${leftBoundary} ${nextY} ${leftBoundary + r} ${nextY} `;
            } else {
               d += `L ${screenStartX} ${y} `;
            }
         }
      }

      const path = document.createElementNS(
         "http://www.w3.org/2000/svg",
         "path",
      );
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "var(--primary-red)");
      path.setAttribute("stroke-width", "4");
      path.setAttribute("stroke-dasharray", "1 8");
      path.setAttribute("stroke-linecap", "round");

      svgContainer.appendChild(path);
   }

   // Initial draw
   drawSVGs();

   // Redraw on resize
   window.addEventListener("resize", drawSVGs);
}
