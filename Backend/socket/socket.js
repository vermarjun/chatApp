export default function initializeWS(wss){
    // import WebSocket, { WebSocketServer } from "ws";
    // const wss = new WebSocketServer({port: 8080});
    // import { wss } from "../index.js";
    // console.log("websoket is on!")
    console.log("websocket initialized")
    
    let globalOnline = 0;
    let globalUsers = [];
    const rooms = new Map();

    wss.on("connection", (socket)=>{
        socket.on("message", (m)=>{
            const message = JSON.parse(m.toString());
            if (message.type === "connectGlobal"){
                // connect to global
                globalUsers.push(socket);
                socket.send(JSON.stringify({
                    online: globalUsers.length,
                    author: "",
                    pfp: "",
                    content: "",
                    userId: "server"
                }))
            }
            else if (message.type === "connectRoom"){
                // connect to room
                console.log("connected!")
                const roomId = message.roomId;
                if (!rooms.has(roomId)){
                    rooms.set(roomId, []);
                }
                rooms.get(roomId).push(socket);
                socket.send(JSON.stringify({
                    online: globalUsers.length,
                    author: "",
                    pfp: "",
                    content: "",
                    userId: "server"
                }))
            }
            else if (message.type === "sendMessage" && message.to === "global"){
                // user sent a message to global
                globalUsers.map((user)=>{
                    user.send(JSON.stringify({
                        online: globalUsers.length,
                        author: message.author,
                        pfp: message.pfp,
                        content: message.content,
                        userId: message.userId
                    }))
                })
            }
            else if (message.type === "sendMessage" && message.to === "room"){
                // user sent a message to a room
                const room = rooms.get(message.roomId);
                if (room){
                    room.map((socket)=>{
                        socket.send(JSON.stringify({
                            online: room.length,
                            author: message.author,
                            pfp: message.pfp,
                            content: message.content,
                            userId: message.userId
                        }))
                    })
                }
            }
        })
        
        socket.on("close", ()=>{
            globalUsers = globalUsers.filter(s => s !== socket)
            // console.log(globalOnline);
        })
    })
}