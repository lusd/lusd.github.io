const planesNode = document.querySelectorAll('.plane');
const button = document.querySelector('#slideDown');
const redPlane = document.querySelector('.redPlane');
const header = document.querySelector('.planes__header');
const text = document.querySelector('.planes__text');
const planesPathsNode = document.querySelectorAll('.path path');

let planes = [];
planesNode.forEach(plane => {
  return planes.push(plane)
});

let paths = [];
planesPathsNode.forEach(path => {
  return paths.push(path);
});

const endRedPlaneAnimation = () => {
  window.scrollBy({
    top: 300,
    behavior: 'smooth'
  });
}

const startWhitePlanes = () => {
  for (var i = 0; i < planes.length; i++) {
    planes[i].style.opacity = "1";
    var path = anime.path(paths[i]);
    anime({
      targets: planes[i],
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'easeInCubic',
      duration: 2000,
      loop: 1,
      direction: 'reverse'
    });
  }

  var path = anime.path('.redPath path');
  var tl = anime.timeline({
    targets: redPlane,
    easing: 'easeOutCubic',
    loop: 1
  });

  tl.add({
    duration: 1,
    opacity: 1,
    delay: 500
  })
  .add({
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    duration: 2000,
  })
  .add({
    delay: 0,
    duration: 400,
    rotate: '12.5deg'
  });

  tl.finished.then(endRedPlaneAnimation);
}

const onbuttonClick = (e) => {
  window.scrollBy({
    top: 400,
    behavior: 'smooth'
  });
  startWhitePlanes();
  header.style.opacity = "1";
  header.style.transform = 'translate(0, 0px)';
  text.style.opacity = "1";
  text.style.transform = 'translate(0, 0px)';

}

button.addEventListener('click', onbuttonClick);
