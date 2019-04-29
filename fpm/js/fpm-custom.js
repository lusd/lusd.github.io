$(document).ready(function() {
    $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
})

$(function() {
  $('#main-menu').smartmenus();
});
/* Open when someone clicks on the span element */

function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("myNav").style.opacity = "1";
}
document.getElementById("header__menu__open").addEventListener('click', openNav);

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("myNav").style.opacity = "0";
}
document.getElementById("header__menu__close").addEventListener('click', closeNav);

// Changing src of logo image from desktop to mobile and versa.
go();
window.addEventListener('resize', go);
function go(){
  var el = document.getElementById("headerLogo");
  if (window.screen.width > 860) {
    el.src = "img/masterpage_logo_white.png";
  }
  else{
    el.src = "img/old_logo_mobile.png"
  }
}
