'use strict'

var app = new Vue({
  el: '#app',
  data: {
    txt: 'toujours économique'
  }
})

var animate = (function(){
  var i = 6;
  var countStart = setInterval(function(){
      i--;
      if (i == 1) {clearInterval(countStart);}
      document.getElementById('body').style.backgroundImage = "url('img/Fond" + i + ".jpg')";
  }, 3000);
})();



// var countBg = function (){
//     var element = document.getElementById('body');
//
//     for (var i = 5; i < 0; i--){
//       element.style.backgroundImage = "url(../img/Fond" + i + ".jpg)"
//     }
// }
