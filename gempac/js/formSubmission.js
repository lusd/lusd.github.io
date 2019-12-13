function formSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var input = document.getElementById("captcha");
  var success = document.getElementById('success');
  var mistake = document.getElementById('mistake');
  if (input.classList.contains('correct')) {
    console.log('I can submit');
    mistake.classList.remove("animate");
    mistake.style.display = "none";
    success.style.display = "block";
    setInterval(function () {
      success.classList.add('animate');
    }, 50);
    setInterval(function() {
      success.style.display = "none";
    }, 5000);
    form.submit();
  }
  else {
    mistake.style.display = "block";
    setInterval(function() {
      mistake.classList.add("animate");
    }, 150);
    console.log('I will not sumbit');
    return false;
  }
}
