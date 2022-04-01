document.addEventListener('DOMContentLoaded', loadWindow, false)

 function loadWindow () {

   Array.from(document.getElementsByTagName('button')).forEach(function (value, i, col) {
     col[i].onclick = function (e) { mode(e.target.id) }
   })}

async function sendRequest(data,callback){
	ws.onmessage=callback
	ws.send(data)
}


function getPromiseFromEvent(item, event) {
  return new Promise((resolve) => {
    const listener = () => {
      item.removeEventListener(event, listener);
      resolve();
    }
    item.addEventListener(event, listener);
  })
}

async function waitForResponse() {
  await getPromiseFromEvent(ws, "onmessage")
  console.log("messaqe recieved")
}


let statusConnected = false
let sessionId

ws = new WebSocket("ws://supermicro1.localdomain/websocket")
	console.log("initialized websocket")

ws.onmessage = function(evt) {
     if (statusConnected === false){
          if (evt.data === "connected"){
  	  	statusConnected = true  	  	
  	  } else if (evt.data === "failed"){
  	  	console.log("error")
          }
     }else{
     
     
    }

}

ws.onopen = function() {
	console.log("connected")
	//JSON.stringify({"id":"d8e715be-6bc7-11e6-8c28-00e04d680384","msg":"method",
	//                        "method":"auth.login","params": ["root","hendrix1942"]})
//	ws.send()
	main()
}

ws.onclose = function() {
	console.log("closed websocket")
}
  

function main(){	
		sendRequest(JSON.stringify({"msg": "connect","version": "1","support": ["1"]})
	                        ,function(evt) {
						let jsonData=JSON.parse(evt.data)
						console.log(jsonData)
						if (jsonData.msg === "connected"){
	                          	  	statusConnected = true
	                          	  	sessionId = jsonData.session
	                          	  	console.log(jsonData.session)
	                          	  	 } else if (jsonData.msg === "failed"){
		  	  			console.log("error")
        			  		}
        			  		console.log("waiting")
        			  		waitForResponse()
        			  		console.log("done waiting")
        			  		})	
		sendRequest(JSON.stringify({"id":"d8e715be-6bc7-11e6-8c28-00e04d680384","msg":"method",
			                     "method":"auth.login","params": ["root","hendrix1942"]})
	                      ,function(evt) {
						let jsonData=JSON.parse(evt.data)
						console.log(jsonData)
						if (jsonData.msg === "connected"){
	                        	  	statusConnected = true
	                         	  	sessionId = jsonData.session
	                          	  	console.log(jsonData.session)
	                         	  	 } else if (jsonData.msg === "failed"){
		  	  			console.log("error")
        			  		}
        			  		console.log("more waiting")
		  	  			waitForResponse()
		  	  			console.log("more done waiting")
        			  		})	

	//ws.close()
}





