import {WebSocketServer} from 'ws'

const wss = new WebSocketServer({port : 8080});
console.log('WebSocket server started on port 8080');

let usercount = 0;

wss.on('connection',(socket)=>{
    console.log('client server connection established');
   
    usercount += 1;
    console.log(`User connected. Total users: ${usercount}`);
    
    socket.on('message', (message)=>{
        // Log the raw message
        console.log('raw message payload from client:', message);
        console.log('message payload in string', message.toString())
        console.log(message.toString() === "ping") 
        
        if(message.toString() === "ping"){
            socket.send('pong');
        }
    });
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
    socket.on('close', () => {
        usercount -= 1;
        console.log(`User disconnected. Total users: ${usercount}`);
    });
});

