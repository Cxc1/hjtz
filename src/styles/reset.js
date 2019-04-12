window.onload = window.onresize = function () {
  var windowW = document.body.clientWidth;
  // 750 20
  var htmlPx = windowW / 750 * 24;
  document.getElementsByTagName('html')[0].style.fontSize = htmlPx + 'px'
};
