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
