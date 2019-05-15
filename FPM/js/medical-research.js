function openModal(){
  var element = document.getElementById('getModal');
  var modal = document.getElementById('medicalModal');
  element.onclick = function(){
    modal.style.display = "flex";
    function fadeIn() {
      modal.style.opacity = "1";
    }
    setTimeout(fadeIn, 350);
  }
}
openModal();
window.addEventListener('click', closeModal);
function closeModal(event){
  var modal = document.getElementById('medicalModal');
  if (event.target == modal) {
    modal.style.opacity = "0";
    function fadeOut() {
      modal.style.display = "none";
    }
    setTimeout(fadeOut, 350);
  }
}

medicalGo();
window.addEventListener('resize', medicalGo);
function medicalGo(){
  var el = document.getElementById("medicalImage");
  if (window.screen.width <= 1090) {
    el.src = "img/medicalresearch_abovethefold_mobile.png";
  }
  else{
    el.src = "img/medicalresearch_abovethefold.png";
  }
}
