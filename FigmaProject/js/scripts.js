const video = document.querySelector("#embedded");
const optimizeVideoSize = () => {
  if (window.innerWidth < 767) {
    video.setAttribute("width", `${window.innerWidth - 40}`);
    video.setAttribute("height", `${(window.innerWidth - 40)/16*9}`);
  }
}
window.addEventListener("DOMContentLoaded", optimizeVideoSize);
window.addEventListener("resize", optimizeVideoSize);
