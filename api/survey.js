const fs = require('fs');
const path = require('path');

// 数据文件路径
const dataFile = path.join('/tmp', 'survey-data.json');

// 初始化数据文件
function initData() {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify([]));
    }
}

// 读取数据
function readData() {
    initData();
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
}

// 写入数据
function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    // 设置 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        // 获取所有数据
        const data = readData();
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        // 提交新数据
        const body = req.body;
        const data = readData();
        data.push({
            ...body,
            timestamp: new Date().toISOString()
        });
        writeData(data);
        res.status(200).json({ success: true, message: '提交成功' });
    } else if (req.method === 'DELETE') {
        // 清空数据
        writeData([]);
        res.status(200).json({ success: true, message: '数据已清空' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
