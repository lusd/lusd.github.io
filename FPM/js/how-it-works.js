goHow();
window.addEventListener('resize', goHow);
function goHow(){
  var el = document.getElementById("howResultsImage");
  var elSecond = document.getElementById("howWorksImage");
  var elThird = document.getElementById('howNeedsImage');
  var elFourth = document.getElementById('howPracticeImage');
  if (window.screen.width > 1090 || window.screen.width < 766) {
    el.src = "img/howitworks_whatresultcaniexpect.jpg";
  }
  else{
    el.src = "img/howitworks_whatresultcaniexpect-crop-u413671.jpg";
  }
  if (window.screen.width > 860){
    elSecond.src = "img/howitworks_abovethefolddesktop.jpg";
    elThird.src = "img/howitwork_howdoesgiworkdesktop.jpg";
    elFourth.src = "img/whatdoesasessionlooklike-desktop.jpg"
  }
  else{
    elSecond.src = "img/howitworks_abovethefold.jpg";
    elThird.src = "img/howitwork_howdoesgiwork.jpg";
    elFourth.src = "img/whatdoesasessionlooklike-mobile.jpg"
  }
}
