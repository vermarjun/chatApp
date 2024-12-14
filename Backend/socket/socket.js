export default function initializeWS(wss){
    // import WebSocket, { WebSocketServer } from "ws";
    // const wss = new WebSocketServer({port: 8080});
    // import { wss } from "../index.js";
    // console.log("websoket is on!")
    console.log("websocket initialized")
    
    let globalOnline = 0;
    let globalUsers = [];
    const rooms = new Map();

    wss.on("connection", function connection(socket){
        globalUsers.push(socket);
        console.log(globalOnline," ", globalUsers.length);
        socket.on("message", (m)=>{
            const message = JSON.parse(m.toString());
            // broadcasting a message to all users, including sender!
            if (message.type === "sendMessage" && message.to === "global"){
                globalUsers.map((user)=>{
                    user.send(JSON.stringify({
                        author: message.author,
                        pfp: message.pfp,
                        content: message.content,
                        userId: message.userId
                    }))
                })
            }
            if (message.type === "sendMessage" && message.to === "room"){
                const room = rooms.get(message.roomId);
                if (room){
                    room.map((user)=>{
                        user.send(JSON.stringify({
                            author: message.author,
                            pfp: message.pfp,
                            content: message.content,
                            userId: message.userId
                        }))
                    })
                }
            }
            if (message.type === "joinRoom"){
                const room = rooms.get(message.roomId);
                if (room){
                    room.push(socket); //if room exists then push this user to that room
                }
            }
        })
        
        socket.on("close", ()=>{
            globalUsers = globalUsers.filter(s => s !== socket)
            console.log(globalOnline);
        })
    })
}