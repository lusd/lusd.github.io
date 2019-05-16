function contact(){
  var submit = document.getElementById('customerSubmit');
  submit.addEventListener('click',check);
  function check(element){
    var inputs = document.getElementsByClassName('customer__form__input');
    var areas = document.getElementsByClassName('customer__form__area');
    var checkboxes = document.getElementsByClassName('customer__checkbox');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        element.preventDefault();
        inputs[i].style.border = "1px solid red";
        inputs[i].classList.add('customer__form__active');
        inputs[i].previousElementSibling.style.color = "red";
      }
    }
    for (var i = 0; i < areas.length; i++){
      if (areas[i].value == ""){
        element.preventDefault();
        areas[i].style.border = "1px solid red";
        areas[i].classList.add('customer__form__active');
        areas[i].previousElementSibling.style.color = "red";
      }
    }
    var checkboxesCount = 0;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesCount = checkboxesCount + 1;
      }
    }
    if (checkboxesCount == 0) {
      var checkboxGroups = document.getElementsByClassName('customer__checkbox__group');
      for (var i = 0; i < checkboxGroups.length; i++) {
        checkboxGroups[i].style.color = "red";
      }
      document.getElementById('customerCheckboxQuestion').style.color = "red";
    }
    else {
      var checkboxGroups = document.getElementsByClassName('customer__checkbox__group');
      for (var i = 0; i < checkboxGroups.length; i++) {
        checkboxGroups[i].style.color = "#444";
      }
      document.getElementById('customerCheckboxQuestion').style.color = "#444";
    }
  }
}
contact();

function checkName(){
  var name = document.getElementById('customerName');
  if (name.value == "") {
    name.style.border = "1px solid red";
    name.classList.add('customer__form__active');
  }
  else {
    name.style.border = "1px solid #ccc";
    name.previousElementSibling.style.color = "#444";
  }
}
function checkEmail(){
  var email = document.getElementById('customerEmail');
  if (email.value == "") {
    email.style.border = "1px solid red";
    email.classList.add('customer__form__active');
  }
  else {
    email.style.border = "1px solid #ccc";
    email.previousElementSibling.style.color = "#444";
  }
}

function checkArea(element){
    if (element.value == "") {
      element.style.border = "1px solid red";
      element.classList.add('customer__form__active');
      element.previousElementSibling.style.color = "red";
    }
    else {
      element.style.border = "1px solid #ccc";
      element.previousElementSibling.style.color = "#444";
    }
}

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
