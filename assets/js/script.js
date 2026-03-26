
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
