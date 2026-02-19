const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    moduleName: {
        type: String,
        required: true,
        enum: ['addition', 'multiplication', 'division', 'fractions', 'odd_even', 'shapes']
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    timeTakenSeconds: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);
