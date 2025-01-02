import mongoose from "mongoose";
import { Schema } from "mongoose";

const ConversationSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }], 
    createdAt: { type: Date, default: Date.now },
})

export const RoomModel = mongoose.model("Room", RoomSchema);
