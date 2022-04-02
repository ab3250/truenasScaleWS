
function getPromiseFromEvent(item, event) {
	return new Promise((resolve) => {
	  const listener = (data) => {
		item.removeEventListener(event, listener);
		resolve(data);
	  }
	  item.addEventListener(event, listener);
	})
  }

ws = new WebSocket("ws://supermicro1.localdomain/websocket")
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
		let connectResult = await getPromiseFromEvent(ws, "message")
		let connectResultParsed = JSON.parse(connectResult.data)
		let sessionId = connectResultParsed.session
		// Login & parse result
		const loginStr = JSON.stringify({"id":sessionId,"msg":"method","method":"auth.login","params": ["root","hendrix1942"]})
		ws.send(loginStr)
		let loginResult = await getPromiseFromEvent(ws, "message")
		let loginResultParsed = JSON.parse(loginResult.data)
		//  get datasets & parse results
		const getDatasetsStr = JSON.stringify({"id": sessionId,"msg": "method",
											   "method": "pool.filesystem_choices","params": []})
		ws.send(getDatasetsStr)
		let getDatasetResult = await getPromiseFromEvent(ws, "message")
		let getDatasetResultParsed = JSON.parse(getDatasetResult.data)
		console.log(getDatasetResultParsed)
}





