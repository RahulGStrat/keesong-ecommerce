// Recipe slider initialization
$(".kse-recipe-slider__track").slick({
   slidesToShow: 4,
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


