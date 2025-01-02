import MessageModel  from "../model/messages.js"

// fetch chat messages
export const fetchMessages = async(req, res)=>{
    try {
        const {recieverId ,page, limit} = req.query;
        const skip = (page-1)*limit;
        const messages = await MessageModel.find({receiverId:recieverId})
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

export const postMessages = async(req, res)=>{
    try {
        const { recieverId ,content } = req.body;
        const newMessage = new MessageModel({
            receiverId: recieverId,
            author : req.userId,
            content : content,
        })
        await newMessage.save();
        return res.status(201).json({ message: "Message Saved", success: true});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}