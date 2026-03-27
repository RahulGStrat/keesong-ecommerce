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

