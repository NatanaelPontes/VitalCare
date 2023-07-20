const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'vitalcare@gmail.com', 
    pass: 'ClinicaMedica753' 
  }
});

app.post('/enviar_email', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const mailOptions = {
    from: 'vitalcare@gmail.com', 
    to: 'ouvidoria@vitalcare.com', 
    subject: assunto,
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao enviar o email.' });
    } else {
      console.log('Email enviado: ' + info.response);
      res.status(200).json({ message: 'Email enviado com sucesso.' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
