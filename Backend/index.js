import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./util/DataBase.js";
import cors from "cors";
import "dotenv/config";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true                
};
app.use(cors(corsOptions));

// Route
app.get("/api/home", (req, res) => {
    return res.status(200).json({
        message: "Han chal raha hai backend",
        success: true
    });
});
app.post("/api/global", (req, res)=>{

})

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
