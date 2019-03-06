//Add 1 like to a post, make a heart red. And reverse.
document.getElementById('addLike').addEventListener("click", function(){
    var x = document.getElementById('likeCount');
    if (this.style.color != "red"){
        x.innerHTML = Number(x.innerText) + 1;
        this.style.color = "red";
    }
    else {
      x.innerHTML = Number(x.innerText) - 1;
      this.style.color = "#ccc";
    }
})

//Set year on footer
document.getElementById('getYear').innerHTML = new Date().getFullYear();

//Make a  sticky sidebar post menu.
var fixed = (function () {
    window.onscroll = function(){ checkPosition()};
    window.addEventListener("orientationchange", checkPosition());
    var sticky = sidebar.offsetTop;
    function checkPosition(){
        if (window.matchMedia('(min-width: 1023px)').matches){
            var sidebar = document.getElementById("sidebar");
            if (window.pageYOffset >= sticky) {
                sidebar.classList.add("sticky");
            } else {
                sidebar.classList.remove("sticky");
            }
            if(window.pageYOffset == 0) {
                sidebar.classList.remove("sticky");
            }
        }
        else {
            var sidebar = document.getElementById("sidebar");
            sidebar.classList.remove("sticky");
        }
    }
})();
