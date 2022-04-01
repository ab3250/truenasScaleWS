
document.addEventListener('DOMContentLoaded', loadWindow, false)

function loadWindow () {
}

function sendRequest(item,data,callback){
	item.onmessage=callback
	item.send(data)
}

function getPromiseFromEvent(item, evt, str) {
	ws.send(str)
  return new Promise((resolve) => {
     const listener = (data) => {
       item.removeEventListener(evt, listener);
       resolve(data);
     }
     item.addEventListener(evt, listener);
   })
 }


async function waitForResponse(str) {	
  let data = await getPromiseFromEvent(ws, "onmessage",str)  
}




ws = new WebSocket("ws://supermicro1.localdomain/websocket")
	console.log("initialized websocket")

ws.onmessage = function(evt) {
    //  if (statusConnected === false){
    //       if (evt.data === "connected"){
  	//   	statusConnected = true  	  	
  	//   } else if (evt.data === "failed"){
  	//   	console.log("error")
    //       }
    //  }else{
     
     
    // }


}

ws.onopen = function() {
	console.log("connected")
	main()
}

ws.onclose = function() {
	console.log("closed websocket")
}
  

async function main(){		
		console.log("p1 start")			
		waitForResponse(connectStr).then({console.log("p1 end")
										      console.log("p2 start")
											  waitForResponse(loginStr)
											  .then(console.log("p2 end"))})

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
	//ws.close()
}





