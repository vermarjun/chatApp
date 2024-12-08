import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Export the User model
const User = mongoose.model("User", UserSchema);

export default User;
