let statusConnected = false
let sessionId = 111

const connectStr = JSON.stringify({"msg": "connect","version": "1","support": ["1"]})
const loginStr = JSON.stringify({"id":sessionId,"msg":"method","method":"auth.login","params": ["root","hendrix1942"]})

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