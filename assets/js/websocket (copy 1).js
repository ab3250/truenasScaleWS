


document.addEventListener('DOMContentLoaded', loadWindow, false)

// function loadWindow () {
//   Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
//     col[i].onclick = function (e) { mode(e.target.id) }
//   })}



ws = new WebSocket("ws://supermicro1.localdomain/websocket")
	console.log("initialized websocket")

ws.onmessage = function(evt) {
     console.log(evt.data);
     document.getElementById('out').innerHTML = evt.data
}
ws.onopen = function() {
	console.log("connected")
	main()
}
ws.onclose = function() {
	console.log("closed websocket")
}

function mode (btnID) {
    if(btnID === "close"){
      ws.onclose()
    }else{
    ws.onmessage(btnID)}
}

 
  
function loadWindow () {
  Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
    col[i].onclick = function (e) { mode(e.target.id) }
  })

  //const interval = setInterval(function() {
  //  ws.send("")    
  //}, 1000)
}
  

function main(){
ws.send(JSON.stringify({"msg": "connect","version": "1","support": ["1"]}))
ws.close()
}


