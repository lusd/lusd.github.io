
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
let navbar = document.getElementById("navbar");
let mobile = document.getElementById("mobile");
let offsetTop = document.getElementById('headerOffsetTop');

// Get the offset position of the navbar
let sticky = navbar.offsetTop;
let stickymobile = mobile.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    offsetTop.style.marginTop = "37px";
  } else {
    navbar.classList.remove("sticky");
    offsetTop.style.marginTop = "0";
  }
  if (window.pageYOffset >= stickymobile) {
    mobile.classList.add("sticky-mobile")
  } else {
    mobile.classList.remove("sticky-mobile");
  }
}
$(document).ready(function() {
  $(function() {
    $('#main-menu').smartmenus({
      keepHighlighted: true,
      markCurrentItem: true
    });
  });
  $(function() {
    $('.main-block').matchHeight();
  });
});
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});
