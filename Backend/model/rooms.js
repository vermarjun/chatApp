import mongoose from "mongoose";
import { Schema } from "mongoose";

const RoomSchema = new Schema({
    roomName: {type: String, required: true},
    description : {type: String, required: false},
    creatorId : {type: mongoose.Schema.Types.ObjectId , required : true, ref:"users"},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }], 
    createdAt: { type: Date, default: Date.now },
})

export const RoomModel = mongoose.model("Room", RoomSchema);
