import {WebSocketServer} from 'ws'

const wss = new WebSocketServer({port : 8080});

let usercount = 0;

wss.on('connection',(socket)=>{
    // usercount += 1;
    // console.log("user connected", + usercount);
    socket.on('message',(message)=>{
        console.log('message from client',message.toString())
        
    })
    socket.send('Hello from server')
   
})

