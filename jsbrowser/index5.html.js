const username = 'root'
const password = 'hendrix1942'

let sessionId = 1
let count = 0

const ws = new WebSocket('ws://supermicro1.localdomain/websocket')
ws.onopen = function () {
  console.log('connected')
  main()
}

ws.onclose = function () {
  console.log('closed websocket')
}

console.log('initialized websocket')

function getPromiseFromEvent (item, event, str) {
  ws.send(str)
  return new Promise((resolve) => {
    const listener = (data) => {
      item.removeEventListener(event, listener)
      resolve(data)
    }
    item.addEventListener(event, listener)
  })
}

function ConnectAndLogin (localUsername, localPassword) {
  const connectStr = JSON.stringify({
    msg: 'connect',
    version: '1',
    support: ['1']
  })
  getPromiseFromEvent(ws, 'message', connectStr)
    .then(function (result) {
      console.log(result)
      sessionId = JSON.parse(result.data).session
      const loginStr = JSON.stringify({
        id: sessionId,
        msg: 'method',
        method: 'auth.login',
        params: [localUsername, localPassword]
      })
      return getPromiseFromEvent(ws, 'message', loginStr)
    })
  // .then(function(result) {
  //   console.log(result)
  //   main()
  // })
    .catch(function (result) {
      console.log(result)
    })
}

function main () {
  // Login & parse result
  const connectStr = JSON.stringify({
    msg: 'connect',
    version: '1',
    support: ['1']
  })
  getPromiseFromEvent(ws, 'message', connectStr)
    .then(function (result) {
      console.log(result)
      sessionId = JSON.parse(result.data).session
      const loginStr = JSON.stringify({
        id: sessionId,
        msg: 'method',
        method: 'auth.login',
        params: ['root', 'hendrix1942']
      })
      return getPromiseFromEvent(ws, 'message', loginStr)
    })
    .then(function (result) {
      console.log(result)
      const getPoolsStr = JSON.stringify({
        id: sessionId,
        msg: 'method',
        method: 'pool.query',
        params: [[['name', '=', 'tank']]]
      })
      return getPromiseFromEvent(ws, 'message', getPoolsStr)
    })
    .then(function (result) {
      console.log(result)
      const getDiskTempStr = JSON.stringify({
        id: sessionId,
        msg: 'method',
        method: 'disk.temperatures',
        params: [['sda', 'sdb']]
      })
      return getPromiseFromEvent(ws, 'message', getDiskTempStr)
    })
    .then(function (temperaturesResult) {
      console.log(temperaturesResult)
      document.getElementById('out').innerText =
                        ' sda ' +
                        JSON.parse(temperaturesResult.data).result.sda +
                        ' sdb ' +
                        JSON.parse(temperaturesResult.data).result.sdb +
                        ' ' +
                        count++
      const getDiskTempStr = JSON.stringify({
        id: sessionId,
        msg: 'method',
        method: 'auth.logout'
      })
      console.log(getDiskTempStr)
      return getPromiseFromEvent(ws, 'message', getDiskTempStr)
    })
    .then(function (result) {
      console.log(result)
      // ws.close()
      const timeoutID = setTimeout(main, 1000)
    })
    .catch(function (result) {
      console.log(result)
    })
}
