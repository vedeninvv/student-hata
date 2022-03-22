window.addEventListener('load', loadTime);

function loadTime() {
  let pageLoadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.connectStart;
  let footer = document.getElementsByClassName('footer').item(0);
  document.getElementById('time').innerText += pageLoadTime + ' ms (client)';
}
