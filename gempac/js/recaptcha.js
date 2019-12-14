initCaptcha();

function initCaptcha() {
	var captcha = generateCaptcha(),
		captchaAns = eval(captcha);
  var input = document.getElementById("captcha");
	input.setAttribute("placeholder", captcha+" = ");
	input.addEventListener("keyup", function() {
			if (this.value !== "" && this.value == captchaAns) {
        this.classList.remove("wrong");
				this.classList.add("correct");
      }
			else {
        this.classList.remove("correct");
        this.classList.add("wrong");
      }
		});
}

function generateCaptcha() {
	var randomNo = function(n) {
		return Math.floor(Math.random()*n + 1);
	}

	var randomOp = function() {
		return "+-*"[randomNo(3)-1];
	}
	return randomNo(10)+" "+randomOp()+" "+randomNo(10);
}
