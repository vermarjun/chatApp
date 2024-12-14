import mongoose from "mongoose";
import { Schema } from "mongoose";

const GlobalChatSchema = new Schema({
    author : {type: mongoose.Schema.Types.ObjectId , required : true, ref:"users"},
    content : {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
})

export const GlobalChatModel = mongoose.model("Global", GlobalChatSchema);
