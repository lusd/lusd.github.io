const tabsButtonsNode = document.querySelectorAll('.header__tab__item');
const tabsButtons = [];
tabsButtonsNode.forEach(button => {
  tabsButtons.push(button);
})
const tabsContentWrap = document.querySelector('.tabs__content__wrap');
const tabsNode = tabsContentWrap.querySelectorAll('.tab');
tabs = [];
tabsNode.forEach(tab => {
  tabs.push(tab);
})
const closeButtons = document.querySelectorAll('.tab__close');


let prevTab;
function toggleMenu(x) {
  x.classList.toggle("change");
  const menu = document.querySelector('.header__navigation');
  menu.classList.toggle("active");
}

const toggleButton = (number) => {
  tabsButtons.map(button => {
    button.querySelector('img').src = "./img/arrow_down.svg";
  })
  tabsButtons.find((button) => {
    const image = button.querySelector('img');
    if (image.getAttribute('data-tab') === number) {
      image.src = "./img/arrow_up.svg";
    }
  })
}

const showTab = (button) => {
  tabNumber = button.target.getAttribute('data-tab');
  const targetTab = tabs.find((tab) => {
    if (tabNumber === tab.getAttribute('data-tab')) {
      return tab;
    }
  })
  const targetButton = tabsButtons.find((button) => {
    if (tabNumber === button.getAttribute('data-tab')) {
      return button;
    }
  })
  if (targetTab != prevTab) {
    tabsButtons.map(button => {
      button.classList.remove("active");
    });
    targetButton.classList.add('active');
    tabs.map(tab => {
      tab.classList.remove("active");
      tab.style.display = "none";
    });
    targetTab.style.display = "flex";
    setTimeout( () => {
      targetTab.classList.add("active");
    }, 015);
    toggleButton(tabNumber);
    prevTab = targetTab;
  }
  else {
    targetButton.classList.remove('active');
    targetTab.style.display = "none";
    targetTab.classList.remove("active");
    prevTab = 0;
    toggleButton(0);
  }
}

tabsButtons.map(button => {
  button.addEventListener('click', showTab);
});
closeButtons.forEach(button => {
  button.addEventListener('click', showTab);
});
