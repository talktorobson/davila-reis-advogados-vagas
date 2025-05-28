// api/submit.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // --- ADD THIS DEBUGGING LINE HERE ---
    console.log('DEBUG: SMTP_HOST:', process.env.SMTP_HOST);
    console.log('DEBUG: SMTP_PORT:', process.env.SMTP_PORT);
    console.log('DEBUG: SMTP_USER:', process.env.SMTP_USER);
    console.log('DEBUG: SMTP_SECURE:', process.env.SMTP_SECURE);
    // ------------------------------------

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { fullName, email, major, tenure, university, essay, resume, fileName, fileType } = req.body;

    if (!fullName || !email || !major || !tenure || !university || !essay) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'talktorobson@gmail.com',
        subject: `Nova Candidatura de Estágio: ${fullName}`,
        html: `
            <p><strong>Nome Completo:</strong> ${fullName}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Curso:</strong> ${major}</p>
            <p><strong>Semestres Cursados:</strong> ${tenure}</p>
            <p><strong>Universidade:</strong> ${university}</p>
            <p><strong>Por que a advocacia empresarial moderna é seu futuro?</strong></p>
            <p>${essay.replace(/\n/g, '<br>')}</p>
        `,
        attachments: []
    };

    if (resume && fileName && fileType) {
        mailOptions.attachments.push({
            filename: fileName,
            content: resume,
            encoding: 'base64',
            contentType: fileType
        });
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Candidatura enviada com sucesso!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail.', error: error.message });
    }
}
