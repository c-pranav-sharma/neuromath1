const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'db.json');

// Ensure data directory and file exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], reports: [] }, null, 2));
}

const readData = () => {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
    getUsers: () => readData().users,
    getUserById: (id) => readData().users.find(u => u._id === id),
    saveUser: (user) => {
        const data = readData();
        const existingIndex = data.users.findIndex(u => u._id === user._id);
        if (existingIndex >= 0) {
            data.users[existingIndex] = user;
        } else {
            data.users.push(user);
        }
        writeData(data);
        return user;
    },
    getReports: () => readData().reports,
    addReport: (report) => {
        const data = readData();
        data.reports.push(report);
        writeData(data);
        return report;
    },
    getReportsByUserId: (userId) => {
        return readData().reports.filter(r => r.user === userId);
    }
};
