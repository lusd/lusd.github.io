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

//Value for listening button demarrer;
demarrerPressed = false;
//Animate Background image to renew each 3s.
 var animateBg = (function(){
  var i = 6;
  var name = "Fond";
  var countStart = setInterval(function(){
      if (demarrerPressed == true) {
        name = "Fond-Flou";
        i = 6;
        demarrerPressed = false;
      }
      i--;
      document.getElementById('body').style.backgroundImage = "url('img/" + name + i + ".jpg')";
      if (i == 1) {
        i = 7;
      }
  }, 3000);
})();

//Creating Vue object
var app = new Vue({
  el: '#radar',
  data: {
    txt: 'toujours économique',
    isActive : false,
    isFadeOut : false,
    isSliderActive : 1
  }
})

//Animate text on radar to change every 1.5s via Vue object; 2 times.
var animateTxt = (function animateTxt(){
    var arrTxt = ['toujours économique',
                'toujours en avance',
                'toujours sécurisé',
                'toujours à jour',
                'toujours disponible',
                'toujours fonctionnel'
              ];
    var k = document.getElementById('app');
    var i = 1;
    var txtCountStart = setInterval(function(){
          k.innerHTML = arrTxt[i];
          if (i == 5) {
            i = -1;
          }
          if (!document.getElementById('bienvenue').style.display == 'none'){
            clearInterval(txtCountStart);
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
    }, 180);
})();

function goSlider(){
    document.getElementById('body').style.backgroundImage = "url('img/Fond-Flou6.jpg')";
    document.getElementById('radarBtn').style.opacity = 0;
    app.isFadeOut = true;
    demarrerPressed = true;
    setInterval(function(){
      document.getElementById('radarBtn').style.display = "none";
      app.isActive = true;
      document.getElementById('slider').style.display = "block";
      document.getElementById('header').style.display = "flex";
    }, 500);
}

$('.carousel').carousel({
  interval: 0
})
