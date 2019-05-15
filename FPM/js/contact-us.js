function contact(){
  var submit = document.getElementById('contactSubmit');
  submit.addEventListener('click',check);
  function check(element){
    var inputs = document.getElementsByClassName('contact__form__input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        element.preventDefault();
        inputs[i].style.border = "1px solid red";
        inputs[i].classList.add('contact__form__active');
      }
    }
  }
}
contact();

function checkName(){
  var name = document.getElementById('contactName');
  if (name.value == "") {
    name.style.border = "1px solid red";
    name.classList.add('contact__form__active');
  }
  else {
    name.style.border = "1px solid #ccc";
  }
}
function checkEmail(){
  var email = document.getElementById('contactEmail');
  if (email.value == "") {
    email.style.border = "1px solid red";
    email.classList.add('contact__form__active');
  }
  else {
    email.style.border = "1px solid #ccc";
  }
}
