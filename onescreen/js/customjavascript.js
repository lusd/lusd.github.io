function myFunction(x) {
  x.classList.toggle("change");
  var menu = document.getElementById('headerMenu');
  window.setTimeout(showMenuActive, 10);
  function showMenuActive(){
    menu.classList.toggle("active__animate");
  }
  function showMenu(){
    menu.classList.toggle("active");
  }
  showMenu();
}
