//Asynchronously preload all backgorund images for smooth changing on app.
function preloader() {
  var images = new Array()
			function preload() {
				for (var i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
				"img/Fond1.jpg",
				"img/Fond2.jpg",
				"img/Fond3.jpg",
        "img/Fond4.jpg",
        "img/Fond5.jpg",
        "img/Fond-Flou1.jpg",
        "img/Fond-Flou2.jpg",
        "img/Fond-Flou3.jpg",
        "img/Fond-Flou4.jpg",
        "img/Fond-Flou5.jpg",
        "img/Fond-Flou6.jpg",
			)
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);

//Animate Background image to renew each 3s.
var animateBg = (function(){
  var i = 6;
  var countStart = setInterval(function(){
      i--;
      if (i == 1) {clearInterval(countStart);}
      document.getElementById('body').style.backgroundImage = "url('img/Fond" + i + ".jpg')";
  }, 3000);
})();

//Creating Vue object
var app = new Vue({
  el: '#app',
  data: {
    txt: 'toujours économique'
  }
})

//Animate text on radar to change every 1.5s via Vue object; 2 times.
var animateTxt = (function animateTxt(){
    var i = 1;
    var k = 0;
    var arrTxt = ['toujours économique',
                  'toujours en avance',
                  'toujours sécurisé',
                  'toujours à jour',
                  'toujours disponible',
                  'toujours fonctionnel'
                ];
    var txtCountStart = setInterval(function(){
        app.txt = arrTxt[i];
        if (i == 5) {
          if (k == 1) {clearInterval(txtCountStart);}
          i = -1;
          k++;
        }
        i++;
      }, 1500);
})();

//Animate button then introduction page will load first loop;
var animateButton = (function(){
    var animateButtonStart = setInterval(function(){
        var btn = document.getElementById('radarBtn');
        btn.style.border = '4px solid #00b4dd';
        btn.style.color = '#00b4dd';
        btn.disabled = false;
        btn.style.transform = 'scale(1.1)';
    }, 18000);
})();

function checkEnable(){
  var bg = document.getElementById('body').style.backgroundImage;
  if (bg == 'url("img/Fond1.jpg")') {
    alert('I am alive');
  }
}
