// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    doubtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doubt',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Comment', commentSchema);
