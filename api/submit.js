// api/submit.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Ensure the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the data from the request body
    const { fullName, email, major, tenure, university, essay, resume, fileName, fileType } = req.body;

    // Basic server-side validation for mandatory fields
    if (!fullName || !email || !major || !tenure || !university || !essay) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Configure Nodemailer transporter using environment variables
    // These variables will be set in your Vercel project settings
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com' for Gmail
        port: parseInt(process.env.SMTP_PORT || '587', 10), // e.g., 587 (TLS) or 465 (SSL)
        secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587
        auth: {
            user: process.env.SMTP_USER, // Your email address for sending
            pass: process.env.SMTP_PASS // Your email password or app-specific password
        }
    });

    // Define the email options
    const mailOptions = {
        from: process.env.SMTP_USER, // Sender address (should match SMTP_USER)
        to: 'talktorobson@gmail.com', // Recipient email address as requested
        subject: `Nova Candidatura de Estágio: ${fullName}`, // Subject line for the email
        html: `
            <p><strong>Nome Completo:</strong> ${fullName}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Curso:</strong> ${major}</p>
            <p><strong>Semestres Cursados:</strong> ${tenure}</p>
            <p><strong>Universidade:</strong> ${university}</p>
            <p><strong>Por que a advocacia empresarial moderna é seu futuro?</strong></p>
            <p>${essay.replace(/\n/g, '<br>')}</p> `,
        attachments: [] // Initialize attachments array
    };

    // If a resume file was uploaded, add it to the attachments
    if (resume && fileName && fileType) {
        mailOptions.attachments.push({
            filename: fileName,
            content: resume, // Base64 content of the file
            encoding: 'base64', // Specify encoding as base64
            contentType: fileType // Original MIME type of the file
        });
    }

    try {
        // Attempt to send the email
        await transporter.sendMail(mailOptions);
        // Send a success response back to the client
        res.status(200).json({ message: 'Candidatura enviada com sucesso!' });
    } catch (error) {
        // Log the error and send an error response if email sending fails
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail.', error: error.message });
    }
}
