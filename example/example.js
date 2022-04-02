
document.addEventListener('DOMContentLoaded', loadWindow, false)
  
function loadWindow () {
  Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    col[i].click = function (e) { mode(e) }
  })
 }

function getPromiseFromEvent(item, event) {
  return new Promise((resolve) => {
    const listener = (data) => {
      item.removeEventListener(event, listener);
      resolve(data);
    }
    item.addEventListener(event, listener);
  })
}

async function waitForButtonClick() {
  const btn = document.getElementById("btn")
  const payload = document.getElementById("payload")
  payload.innerHTML += "<p>Waiting for you to press the button</p>"
  await getPromiseFromEvent(btn, "click")
  payload.innerHTML = "<p>The button was pressed!</p>"
  
}

function mode (e) {
 console.log(e)
 alert(e)
}

waitForButtonClick()

