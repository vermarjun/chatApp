import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true }, //DM me roomId ki jagah reciever ki id aaa jayegi baki global aur chatRooms me unki id
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  content: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now }, 
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;