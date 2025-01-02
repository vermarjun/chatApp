import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./util/DataBase.js";
import userRoutes from "./Router/userRoute.js"
import globalRoutes from "./Router/globalRoute.js"
import initializeWS from "./socket/socket.js";
import roomRoutes from "./Router/roomRoute.js"
import messages from "./Router/messages.js"
import User from "./model/user.js";

const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({server});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true                
// };
// app.use(cors(corsOptions));
app.use(cors());

// Route
initializeWS(wss);
app.get("/api/home", (req, res) => {
    console.log("recived")
    return res.status(200).json({
        message: "Han chal raha hai backend",
        success: true
    });
});

app.use('/api/v1/users', userRoutes);  // Prefix for user-related routes

app.use('/api/v1/global', globalRoutes);

app.use('/api/v1/room', roomRoutes); // create room

app.use('/api/v1/messages', messages); // both chatroom and dm messages 

app.get('/api/v1/search', async (req, res,)=>{
    const { query } = req.query;
    try {
        if (!query) return res.status(200).json({
                message:[],
                success:true
        });
        const users = await User.find({
            fullname: {
                $regex: query,
                $options: "i"
            }
        }).limit(10);
        return res.status(200).json({ message:users, success:true })
    } catch (error){
        return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message })
    }
});


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    connectDB();
    console.log(`HTTP and WEBSOCKET server are listening on port ${PORT}`);
});
