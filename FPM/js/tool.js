function fpmTool(){
  var coll = document.getElementsByClassName("tool__collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("tool__collapsible__active");
      console.log(this.classList);
      var image = this.getElementsByClassName("tool__collapsible__image");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
        image[0].src = "img/arrow-down 2.png";
        this.classList.remove("tool__collapsible__active");
      } else {
        for (var j = 0; j < coll.length; j++) {
          var collapse = coll[j].nextElementSibling;
          var collapseImg = coll[j].getElementsByClassName("tool__collapsible__image");
          if (collapse.style.maxHeight) {
            collapse.style.maxHeight = null;
            collapseImg[0].src = "img/arrow-down 2.png";
            coll[j].classList.remove("tool__collapsible__active");
          }
        }
        content.style.maxHeight = content.scrollHeight + "px";
        image[0].src = "img/arrow-up.png";
      }
    });
  }
};
fpmTool();
