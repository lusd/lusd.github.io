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
const header = document.querySelector('.header__static__wrap');
const headerOffsetTop = header.offsetTop;
const head = document.querySelector('.head');


const toggleMenu = (button) => {
  document.querySelector('.header__navigation').classList.toggle('active');
  button.classList.toggle('change');
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
  targetTab.style.display = "flex";
  setTimeout( () => {
    targetTab.classList.add('active');
  }, 0015);
  toggleButton(tabNumber);
}



const leaveButton = (button) => {
  prevTarget = button.relatedTarget;
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
  if (prevTarget == targetTab) {
  } else {
    targetTab.classList.remove('active');
    targetTab.style.display = "none";
    toggleButton(0);
  }
}

(function() {
  window.addEventListener("resize", resizeThrottler, false);
  var resizeTimeout;
  function resizeThrottler() {
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
       }, 66);
    }
  }
  function actualResizeHandler() {
    setEventListeners(window.screen.width);
  }
}());

const setEventListeners = (width) => {
  if (width < 1023.98) {
    tabsButtons.map(button => {
      button.addEventListener('click', showTab);
      button.removeEventListener('mouseenter', showTab);
      button.removeEventListener('mouseleave', leaveButton);
    });
    tabs.map(tab => {
      tab.removeEventListener('mouseleave', leaveButton);
    })
  } else {
    tabsButtons.map(button => {
      button.removeEventListener('click', showTab);
      button.addEventListener('mouseenter', showTab);
      button.addEventListener('mouseleave', leaveButton);
    });
    tabs.map(tab => {
      tab.addEventListener('mouseleave', leaveButton);
    })
  }
}

setEventListeners(window.screen.width);

closeButtons.forEach(button => {
  button.addEventListener('click', leaveButton);
});

const fixedTopMenu = () => {
  if (window.screen.width >= 1024) {
    if (window.scrollY >= headerOffsetTop) {
      header.style.position = "fixed";
      header.style.top = 0;
      head.style.marginTop = '80px';
    }
    else {
      header.style.position = "inherit";
      header.style.top = null;
      head.style.marginTop = 0;
    }
  }
}

function debounce(func, wait = 1, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

window.addEventListener('scroll', debounce(fixedTopMenu));
