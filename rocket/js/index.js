const toggleMenu = (button) => {
  document.querySelector('.header__navigation').classList.toggle('active');
  button.classList.toggle('change');
}

  AOS.init();
