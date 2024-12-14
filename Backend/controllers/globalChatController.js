import {GlobalChatModel} from "../model/globalChat.js"

// fetch global chat messages
export const fetchGlobalMessages = async(req, res)=>{
    try {
        const {page, limit} = req.query;
        const skip = (page-1)*limit;
        const messages = await GlobalChatModel.find()
            .sort({ createdAt: -1 }) 
            .skip(parseInt(skip)) 
            .limit(parseInt(limit)) 
            .populate("author", "fullname pfp")
            .exec();
        res.status(200).json({message:messages, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}

export const postGlobal = async(req, res)=>{
    try {
        const { content } = req.body;
        const newMessage = new GlobalChatModel({
            author : req.userId,
            content : content,
        })
        await newMessage.save();
        return res.status(201).json({ message: "Message Saved", success: true});
    } catch(error){
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}