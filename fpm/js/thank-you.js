$(document).ready(function() {
  // Loading bootstrap css file after whole page is loads
    $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
  // Open modal window after page is ready
    function openModal(){
      var modal = document.getElementById('thanksModal');
      modal.style.display = "flex";
      function fadeIn() {
          modal.style.opacity = "1";
      }
      setTimeout(fadeIn, 125);
    }
    openModal();
})

function closeModal(event){
  var modal = document.getElementById('thanksModal');
  if (event.target == modal) {
    modal.style.opacity = "0";
    function fadeOut() {
      modal.style.display = "none";
    }
    setTimeout(fadeOut, 250);
  }
}
window.addEventListener('click', closeModal);
document.getElementById('thanksButton').addEventListener('click', function(){
  var modal = document.getElementById('thanksModal');
  modal.style.opacity = "0";
  function fadeOut() {
    modal.style.display = "none";
  }
  setTimeout(fadeOut, 250);
});

// Changing src of logo image from desktop to mobile and versa.
go();
window.addEventListener('resize', go);
function go(){
  var el = document.getElementById("headerLogo");
  if (window.screen.width > 860) {
    el.src = "img/masterpage_logo_white.png";
  }
  else{
    el.src = "img/old_logo_mobile.png";
  }
}
