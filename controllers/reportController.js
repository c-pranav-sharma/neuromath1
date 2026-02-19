const store = require('../data/store');
const { v4: uuidv4 } = require('uuid'); // Use uuid for new users

exports.getUserReport = async (req, res) => {
    try {
        const user = store.getUserById(req.params.userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const allReports = store.getReportsByUserId(req.params.userId);
        const recentReports = allReports.filter(r => new Date(r.timestamp) >= sevenDaysAgo);

        res.status(200).json({
            success: true,
            data: {
                progress: user.progress,
                recentActivity: recentReports
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username } = req.body;
        // Check if user exists
        const users = store.getUsers();
        let user = users.find(u => u.username === username);

        if (user) {
            return res.status(200).json({ success: true, data: user }); // Return existing
        }

        // Create new
        user = {
            _id: Date.now().toString(), // Simple ID
            username,
            progress: {
                addition: { attempts: 0, successCount: 0, avgTimeSeconds: 0 },
                multiplication: { attempts: 0, successCount: 0, avgTimeSeconds: 0 }
            },
            createdAt: new Date()
        };

        store.saveUser(user);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
