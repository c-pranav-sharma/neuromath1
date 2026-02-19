const store = require('../data/store');
const { v4: uuidv4 } = require('uuid'); // We might need uuid if not using mongo _id

// Helper to ensure user exists
const ensureUser = (userId) => {
    let user = store.getUserById(userId);
    if (!user) {
        // Should not happen if flow is correct, but for safety
        console.error(`User ${userId} not found`);
        return null;
    }
    return user;
};

exports.submitAdditionScore = async (req, res) => {
    try {
        const { userId, score, totalQuestions, timeTaken } = req.body;

        const report = {
            _id: Date.now().toString(), // Simple ID
            user: userId,
            moduleName: 'addition',
            score,
            totalQuestions,
            timeTakenSeconds: timeTaken,
            timestamp: new Date()
        };

        store.addReport(report);

        const user = ensureUser(userId);
        if (user) {
            user.progress.addition.attempts += 1;
            user.progress.addition.successCount += (score === totalQuestions ? 1 : 0);
            user.progress.addition.avgTimeSeconds =
                (user.progress.addition.avgTimeSeconds * (user.progress.addition.attempts - 1) + timeTaken) / user.progress.addition.attempts;
            store.saveUser(user);
        }

        res.status(201).json({ success: true, data: report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.submitMultiplicationScore = async (req, res) => {
    try {
        const { userId, score, totalQuestions, timeTaken } = req.body;

        const report = {
            _id: Date.now().toString(),
            user: userId,
            moduleName: 'multiplication',
            score,
            totalQuestions,
            timeTakenSeconds: timeTaken,
            timestamp: new Date()
        };

        store.addReport(report);

        const user = ensureUser(userId);
        if (user) {
            user.progress.multiplication.attempts += 1;
            user.progress.multiplication.successCount += (score === totalQuestions ? 1 : 0);
            user.progress.multiplication.avgTimeSeconds =
                (user.progress.multiplication.avgTimeSeconds * (user.progress.multiplication.attempts - 1) + timeTaken) / user.progress.multiplication.attempts;
            store.saveUser(user);
        }

        res.status(201).json({ success: true, data: report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
