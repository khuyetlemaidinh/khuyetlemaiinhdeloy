const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2124801030169@student.tdmu.edu.vn', 
        pass: 'maoivitchet169', 
    },
});
app.post('/send-email', (req, res) => {
    const { email, code } = req.body;

    const mailOptions = {
        from: 'hoanganh3042003@gmail.com',
        to: email,
        subject: 'Mã xác nhận đăng ký',
        text: `Mã xác nhận của bạn là: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi gửi email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email đã được gửi:', info.response);
        res.status(200).send('Email đã được gửi');
    });
});

// Chạy server trên localhost
app.listen(PORT, '192.168.1.5', () => {
    console.log(`Server đang chạy trên http://192.168.1.5:${PORT}`);
});
