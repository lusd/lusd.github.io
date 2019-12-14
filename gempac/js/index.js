var card1 = document.getElementById('card1');
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
window.addEventListener('resize', toggleCard);
function toggleCard(){
  if (window.innerWidth < 839) {
    card1.setAttribute('src', "./img/company_mobile.png");
    card2.setAttribute('src', "./img/services_mobile.png");
    card3.setAttribute('src', "./img/clients_mobile.png");
  } else {
    card1.setAttribute('src', "./img/company.jpg");
    card2.setAttribute('src', "./img/services.jpg");
    card3.setAttribute('src', "./img/clients.jpg");
  }
};
toggleCard();
