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
