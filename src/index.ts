import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({port : 8080});
console.log('WebSocket server started on port 8080');


// let allSockets: Set<WebSocket> = new Set();
let allSockets: WebSocket[] = [];

wss.on('connection',(socket)=>{
    console.log('client server connection established');
   
    allSockets.push(socket);

    socket.on('message', (message)=>{
    //    console.log(message.toString());

       allSockets.filter((s) => (s != socket)).map((ws)=>{
           ws.send(message.toString())
       })

    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
    socket.on('close', () => {
        
        console.log('socket connection closed')
    });

    socket.on('disconnect', () => {
        allSockets.filter((s)=> s != socket)
        console.log('User disconnected')
    });

    allSockets.forEach((s)=>{
       s.send('you are connected ')
    })
});

