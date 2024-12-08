import Message from "../model/messages" 

// fetch global chat messages
export const fetchGlobalMessages = async(req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}

export const postGlobal = async(req, res)=>{
    try {
        
    } catch(error){
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
}