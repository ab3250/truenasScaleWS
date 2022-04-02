let statusConnected = false
let sessionId = 111
document.addEventListener('DOMContentLoaded', loadWindow, false)
function loadWindow () {
}
//const connectStr = JSON.stringify({"msg": "connect","version": "1","support": ["1"]})
//const loginStr = JSON.stringify({"id":sessionId,"msg":"method","method":"auth.login","params": ["root","hendrix1942"]})

function connectCb(evt) {
    console.log("recv message" + evt.data)
    let jsonData=JSON.parse(evt.data)
    sessionId = jsonData.session
    console.log("444" + jsonData.session)
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
  }
  
function loginCb(evt) {
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
          }


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
	ws.close()