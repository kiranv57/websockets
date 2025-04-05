import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({port : 8081});
console.log('WebSocket server started on port 8080');


// let allSockets: Set<WebSocket> = new Set();
let allSockets: WebSocket[] = [];

interface roomProps {
    [key: string] : WebSocket []
}
// room map
let rooms: roomProps = {} ;
let room = 'default';

wss.on('connection',(socket)=>{
    console.log('client server connection established');
   
    allSockets.push(socket);
    
    // Get room from URL parameters
    // const url = new URL(socket.url, 'ws://localhost:8081');
    // socket.url has path after base url, so to URL, we pass path + base url
    //  socket.url = ?q=room=chatroom123, base url = ws://localhost:8081, full url: ws://localhost:8081?room=chatroom123

    // const room = url.searchParams.get('room') || 'default';
 
    


    

    socket.on('message', (message)=>{
    //    console.log(message.toString());

    //    allSockets.filter((s) => (s != socket)).map((ws)=>{
    //        ws.send(message.toString())
    //    })

    const msg = JSON.parse(message as unknown as string);
    console.log('parsed message',msg)
    room = msg.room;
        if(!rooms[room])
        {
            rooms[room] = [];
        }
    if(!rooms[room].includes(socket)){
        rooms[room].push(socket);
    }
    //  console.log('room',rooms)    
    rooms[room].filter((ws: WebSocket)=> ws != socket).map((ws: WebSocket)=>{
        ws.send(msg.content)
    })

    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
    socket.on('close', () => {
        rooms[room] = rooms[room].filter((ws: WebSocket)=> ws != socket)
       
        console.log('socket connection closed')
    });

    socket.on('disconnect', () => {
        // allSockets.filter((s)=> s != socket)
         rooms[room] = rooms[room].filter((ws: WebSocket) => ws != socket)
        console.log('User disconnected')
    });

    // allSockets.forEach((s)=>{
    //    s.send('you are connected ')
    // })
});

