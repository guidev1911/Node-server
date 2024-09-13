const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'guispeedcar22@gmail.com', 
        subject: 'Nova mensagem de contato',
        text: `Você recebeu uma nova mensagem de ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar o e-mail');
        }
        res.send('Mensagem enviada com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor está funcionando na porta ${port}`);
});
