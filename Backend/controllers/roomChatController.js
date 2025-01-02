import { RoomModel } from "../model/rooms.js";

// Create Room
export const createRoom = async(req, res)=>{
    try {
        const { roomName, creatorUserId} = req.body;
        if (!roomName || !creatorUserId) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        const existingRoom = await RoomModel.findOne({ roomName:roomName });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room Name already taken, Try with a different room name', success: false });
        }
        const newRoom = new RoomModel({ roomName:roomName, creatorId: creatorUserId, members:[creatorUserId] });

        await newRoom.save();

        return res.status(201).json({ message: "Room created successfully", success: true });
    
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}

// fetch rooms user has joined
export const fetchRooms = async(req, res)=>{
    try {
        const userId  = req.userId;
        if (!userId ) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        const rooms = await RoomModel.find({ members: userId }).populate("creatorId", "fullname");
        return res.status(201).json({ message: rooms, success: true });
    
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}

// fetch all rooms
export const fetchAllRooms = async(req, res)=>{
    const userId = req.userId;
    try {
        const rooms = await RoomModel.find({members: {$ne:userId}}).populate("creatorId", "fullname");
        return res.status(201).json({ message: rooms, success: true });
    
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}

export const joinRoom = async(req, res)=>{
    try {
        const {roomId}  = req.body;
        const userId = req.userId;
        // console.log(req.body, roomId);
        if (!roomId ) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        const newRoom = await RoomModel.findByIdAndUpdate(roomId, { $addToSet: {members: userId}}, {new: true});
        return res.status(201).json({ message: newRoom, success: true });
    
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}
