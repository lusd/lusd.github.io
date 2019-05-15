resizeScience();
window.addEventListener('resize', resizeScience);
function resizeScience(){
  var image = document.getElementById('scienceImage');
  if (window.screen.width > 490) {
    image.src = 'img/the-lemon-exercise-desktop.jpg';
  }
  else image.src = 'img/the_lemon_exercise_mobile.jpg';
}
