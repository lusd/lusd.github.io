
  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {myFunction()};
  window.ontouchstart = function() {myFunction()};

  // Get the navbar
  var navbar = document.getElementById("navbar");
  var mobile = document.getElementById("mobile");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;
  var stickymobile = mobile.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
    if (window.pageYOffset >= stickymobile) {
      mobile.classList.add("sticky-mobile")
    } else {
      mobile.classList.remove("sticky-mobile");
    }

    if(window.pageYOffset == 0) {
      mobile.classList.remove("sticky-mobile");
      navbar.classList.remove("sticky");
    }
  }


  $(document).ready(function() {
    $(function() {
      $('#main-menu').smartmenus({
        keepHighlighted: true,
        markCurrentItem: true
      });
    });
    $(function() {
      $('.main-block').matchHeight();
    });
  });
  $(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      }
    });
  });

  $(document).ready(function() {
    $(function() {
      $('#main-menu').smartmenus({
        keepHighlighted: true,
        markCurrentItem: true
      });
    });
    $(function() {
      $('.properties-match-height').matchHeight();
    });
  });
