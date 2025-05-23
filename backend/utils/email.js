import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // You can configure any SMTP service here
  // For development, you can use Gmail or a testing service like Ethereal
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your_email@example.com',
    pass: process.env.SMTP_PASS || 'your_password'
  }
});

/**
 * Sends an email to supplier about low stock of a medicine
 * @param {Object} options
 * @param {string} options.to - Supplier's email address
 * @param {string} options.drugName - Name of the medicine
 * @param {number} options.quantity - Quantity to reorder
 * @returns {Promise} Email sending result
 */
const sendLowStockEmail = async ({ to, drugName, quantity }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Carefull Pharmacy" <pharmacy@carefull.com>',
      to,
      subject: `Low Stock Alert - ${drugName}`,
      html: `
        <h2>Low Stock Reorder Request</h2>
        <p>This is an automated message to request a restock of the following medicine:</p>
        <ul>
          <li><strong>Medicine:</strong> ${drugName}</li>
          <li><strong>Quantity Requested:</strong> ${quantity} units</li>
        </ul>
        <p>Please process this order as soon as possible.</p>
        <br>
        <p>Best regards,<br>Carefull Pharmacy Team</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export default sendLowStockEmail;
