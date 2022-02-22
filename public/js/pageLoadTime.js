window.onload = loadTime;

function loadTime() {
    let pageLoadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.connectStart) / 1000
    let footer = document.getElementsByClassName("footer").item(0)
    let pageLoadTimeTextLine = document.createElement("p")
    let pageLoadTimeText = document.createTextNode("Time load: " + pageLoadTime.toString() + " s.")
    pageLoadTimeTextLine.appendChild(pageLoadTimeText)
    footer.appendChild(pageLoadTimeTextLine)
}