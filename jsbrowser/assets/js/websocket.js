
function getPromiseFromEvent(item, event) {
	return new Promise((resolve) => {
	  const listener = (data) => {
		item.removeEventListener(event, listener)
		resolve(data);
	  }
	  item.addEventListener(event, listener)
	})
  }

const ws = new WebSocket("ws://supermicro1.localdomain/websocket")
	console.log("initialized websocket")

ws.onopen = function() {
	console.log("connected")
	main()
}

ws.onclose = function() {
	console.log("closed websocket")
}

async function main(){	
		// Connect & parse result
		const connectStr = JSON.stringify({"msg": "connect","version": "1","support": ["1"]})
		ws.send(connectStr)
		const connectResult = await getPromiseFromEvent(ws, "message")
		const connectResultParsed = JSON.parse(connectResult.data)
		const sessionId = connectResultParsed.session
		console.log(connectResultParsed)
		// Login & parse result
		const loginStr = JSON.stringify({"id":sessionId,"msg":"method","method":"auth.login",
									  	 "params": ["root","hendrix1942"]})
		ws.send(loginStr)
		const loginResult = await getPromiseFromEvent(ws, "message")
		const loginResultParsed = JSON.parse(loginResult.data)
		console.log(loginResultParsed)
		//  get datasets & parse result
		const getDatasetsStr = JSON.stringify({"id": sessionId,"msg": "method",
											   "method": "pool.filesystem_choices","params": []})
		ws.send(getDatasetsStr)
		const getDatasetResult = await getPromiseFromEvent(ws, "message")
		const getDatasetResultParsed = JSON.parse(getDatasetResult.data)
		console.log(getDatasetResultParsed)
		// logout
		ws.close()
}





