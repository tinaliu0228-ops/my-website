const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 问卷链接 - 部署后替换为实际域名
const surveyUrl = 'https://my-website-beta-two-52.vercel.app/index.html';

// 生成二维码图片
QRCode.toFile(path.join(__dirname, 'qrcode.png'), surveyUrl, {
    width: 400,
    margin: 2,
    color: {
        dark: '#333333',
        light: '#ffffff'
    }
}, function(err) {
    if (err) throw err;
    console.log('二维码已生成: qrcode.png');
    console.log('问卷链接:', surveyUrl);
});