import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true }, // global and chatroom ke names 
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: { type: Date, default: Date.now },
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

export default ChatRoom