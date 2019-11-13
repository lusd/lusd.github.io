const planesNode = document.querySelectorAll('.plane');
const button = document.querySelector('#slideDown');
let planes = [];
const redPlane = document.querySelector('.redPlane');
const header = document.querySelector('.planes__header');
const text = document.querySelector('.planes__text');

planesNode.forEach(plane => {
  return planes.push(plane)
});

const endWhitePlaneAnimation = () => {
  planes.map(plane => {
    plane.classList.add('offsetDistance1');
    plane.classList.remove('animate');
  })
  startRedPlane();
}

const endRedPlaneAnimation = () => {
  redPlane.classList.add('offsetDistance95');
  redPlane.classList.remove('redPlaneAnimate');
  window.scrollBy({
    top: 300,
    behavior: 'smooth'
  });
}

const startRedPlane = () => {
  redPlane.classList.add('redPlaneAnimate');
  setTimeout(endRedPlaneAnimation, 2000);
}

const onbuttonClick = (e) => {
  window.scrollBy({
    top: 200,
    behavior: 'smooth'
  });
  planes.map(plane => {
    plane.classList.add('animate');
  });
  redPlane.classList.remove('offsetDistance95');
  setTimeout(endWhitePlaneAnimation, 2000);
  header.style.opacity = "1";
  header.style.transform = 'translate(0, 0px)';
  text.style.opacity = "1";
  text.style.transform = 'translate(0, 0px)';
}

button.addEventListener('click', onbuttonClick);
