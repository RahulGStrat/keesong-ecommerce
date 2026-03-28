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
  hamburger.classList.toggle("active");
});

// category click
categoryBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // 👉 ADD ACTIVE CLASS TO MAIN MENU ITEM
  categoryBtn.classList.toggle("active");

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

  // 👉 REMOVE ACTIVE FROM MAIN MENU
  categoryBtn.classList.remove("active");
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

    // 👉 ALSO REMOVE ACTIVE FROM MAIN MENU
    categoryBtn.classList.remove("active");
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


// Recipe slider initialization
$(".kse-recipe-slider__track").slick({
   slidesToShow: 4,
     prevArrow: $('.kse-arrow--prev'),
  nextArrow: $('.kse-arrow--next'),
   slidesToScroll: 1,
   arrows: true,
   dots: false,
   infinite: false,

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
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
         },
      },
   ],
});


document.addEventListener("DOMContentLoaded", function () {
// adding and removing active class for sort module
document.querySelectorAll('.kse-sort__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.kse-sort__btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// filter module - active class adding and removing
$('.kse-filter__listitm').on('click', function () {
  $('.kse-filter__listitm').removeClass('active');
  $(this).addClass('active');
});


/* PDP */
  /* =========================
     THUMBNAIL CLICK
  ========================= */
  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll(".thumb");

  if (mainImage && thumbnails.length) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;

        thumbnails.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  /* =========================
     IMAGE ZOOM
  ========================= */
  const container = document.getElementById("zoomContainer");

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

});
/*  */

/* pdp toggle */
document.addEventListener("DOMContentLoaded", function () {
      const toggleBtn = document.querySelector(".kse-greatwith .toggle-icon");
      const list = document.querySelector(".kse-greatwith__list");

      // default = open
      let isOpen = true;

      toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();

        isOpen = !isOpen;

        // toggle list
        list.style.display = isOpen ? "flex" : "none";

        // rotate icon
        toggleBtn.classList.toggle("rotated", !isOpen);
      });
    });
/*  */