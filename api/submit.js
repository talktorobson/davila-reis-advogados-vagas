// api/submit.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // --- DEBUGGING LINES (Optional, can be removed after verification) ---
    console.log('DEBUG: SMTP_HOST:', process.env.SMTP_HOST);
    console.log('DEBUG: SMTP_PORT:', process.env.SMTP_PORT);
    console.log('DEBUG: SMTP_USER:', process.env.SMTP_USER);
    console.log('DEBUG: SMTP_SECURE:', process.env.SMTP_SECURE);
    // -------------------------------------------------------------------

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the data, including jobTitle
    const { jobTitle, fullName, email, major, tenure, university, essay, resume, fileName, fileType } = req.body;

    // Basic server-side validation
    if (!jobTitle || !fullName || !email || !essay) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios (Título da Vaga, Nome, E-mail, Resposta) devem ser preenchidos.' });
    }

    // Configure Nodemailer transporter using environment variables
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
        to: 'talktorobson@gmail.com', // Recipient email address as requested
        subject: `Nova Candidatura (${jobTitle}): ${fullName}`, // Dynamic subject based on jobTitle
        html: `
            <p><strong>Vaga Aplicada:</strong> ${jobTitle}</p>
            <p><strong>Nome Completo:</strong> ${fullName}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            ${major ? `<p><strong>Curso:</strong> ${major}</p>` : ''}
            ${tenure ? `<p><strong>Semestres Cursados:</strong> ${tenure}</p>` : ''}
            ${university ? `<p><strong>Universidade:</strong> ${university}</p>` : ''}
            <p><strong>Resposta Dissertativa:</strong></p>
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
