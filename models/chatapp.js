const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    user: String,
    content: {
        type: String,
        trim: true
    }
})
const chat = mongoose.model("chat", chatSchema);
module.exports = chat