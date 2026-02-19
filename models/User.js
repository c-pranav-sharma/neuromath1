const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    progress: {
        addition: {
            attempts: { type: Number, default: 0 },
            successCount: { type: Number, default: 0 },
            avgTimeSeconds: { type: Number, default: 0 }
        },
        multiplication: {
            attempts: { type: Number, default: 0 },
            successCount: { type: Number, default: 0 },
            avgTimeSeconds: { type: Number, default: 0 }
        }
        // Add other modules as needed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
