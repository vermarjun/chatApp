import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true }, //DM me reciever ki id aaa jayegi baki chatRooms me room id
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;