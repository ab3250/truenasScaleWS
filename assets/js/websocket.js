
document.addEventListener('DOMContentLoaded', loadWindow, false)



function getPromiseFromEvent(item, event) {

	return new Promise((resolve) => {
	  const listener = (data) => {
		item.removeEventListener(event, listener);
		resolve(data);
	  }
	  item.addEventListener(event, listener);
	})
  }


async function waitForResponse(str) {	
   await getPromiseFromEvent(ws, "onmessage",str)  
}




ws = new WebSocket("ws://supermicro1.localdomain/websocket")
	console.log("initialized websocket")

// ws.onmessage = function(evt) {
//    console.log(evt.data)


// }

ws.onopen = function() {
	console.log("connected")
	main()
}

ws.onclose = function() {
	console.log("closed websocket")
}

async function main(){	
		console.log("p1 start")			
		ws.send(connectStr)
		await getPromiseFromEvent(ws, "message")
		console.log("p1 done")
		console.log("p2 start")	
		ws.send(loginStr)
		await getPromiseFromEvent(ws, "message")
		console.log("p2 done")

	//	console.log("p2 start")	
	//	getPromiseFromEvent(ws, "onmessage", loginStr).then(console.log("p2 end"))

		//sendRequest(ws,loginStr, loginCb)

		// sendRequest(ws,"onmessage",JSON.stringify({"id":"d8e715be-6bc7-11e6-8c28-00e04d680384","msg":"method",
		// 			  "method":"auth.login","params": ["root","hendrix1942"]})
		// 			   ,function(evt) {
		// 			 let jsonData=JSON.parse(evt.data)
		// 			 console.log(jsonData)
		// 			 if (jsonData.msg === "connected"){
		// 						   statusConnected = true
		// 							sessionId = jsonData.session
		// 							 console.log(jsonData.session)
		// 							 } else if (jsonData.msg === "failed"){
		// 				 console.log("error")
		// 				   }
		// 				   console.log("more more waiting")
		// 				 waitForResponse()
		// 				 console.log("more more done waiting")
		// 				   })	  
//	ws.close()
}



function loadWindow () {


}

