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
});
document.getElementById('getYear').innerHTML = new Date().getFullYear();
// When the user scrolls the page, execute myFunction
window.onscroll = function(){ checkPosition()};
function checkPosition(){
    if (window.matchMedia('(min-width: 1023px)').matches){
        var sticky = sidebar.offsetTop;
        var navbar = document.getElementById("sidebar");
        if (window.pageYOffset >= sticky) {
            sidebar.classList.add("sticky");
        } else {
            sidebar.classList.remove("sticky");
        }
        if(window.pageYOffset == 0) {
            sidebar.classList.remove("sticky");
        }
    };
};
