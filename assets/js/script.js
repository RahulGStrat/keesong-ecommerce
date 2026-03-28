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

  const categoryBtn = document.querySelector(".kse-Head__menu-item--category");
  const megaWrap = document.querySelector(".kse-Head__megaWrap");

  categoryBtn.addEventListener("click", function (e) {
    e.preventDefault();

    this.classList.toggle("active");
    megaWrap.classList.toggle("active");
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (!categoryBtn.contains(e.target) && !megaWrap.contains(e.target)) {
      categoryBtn.classList.remove("active");
      megaWrap.classList.remove("active");
    }
  });

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