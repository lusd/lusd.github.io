function toggleMenu(button) {
  var nav = document.querySelector('.navigation');
  nav.classList.toggle('active');
  setTimeout( () => {
    nav.classList.toggle('animation');
  }, 015);
  button.classList.toggle('change');
}
