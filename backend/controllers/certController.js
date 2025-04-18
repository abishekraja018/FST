
const Certificate = require('../models/Certificate');
const generatePDF = require('../utils/generatePDF');
const generateQRCode = require('../utils/generateQRCode');
const sendEmail = require('../utils/sendEmail');
const path = require('path');

exports.issueCertificate = async (req, res) => {
    try {
      const { name, email } = req.body;
      const certificateId = `CERT-${Date.now()}`;
      const issueDate = new Date();
  
      console.log('Saving certificate...');
      const cert = new Certificate({ name, email, certificateId, issueDate, verified: true });
      await cert.save();
  
      console.log('Generating PDF...');
      const filePath = path.join(__dirname, `../certs/${certificateId}.pdf`);
      await generatePDF(cert, filePath);
  
      console.log('Generating QR Code...');
      const qrData = await generateQRCode(`http://localhost:3000/verify?id=${certificateId}`);
  
      console.log('Sending email...');
      const html = `<p>Hello ${name},</p><p>Your certificate is attached.<br><img src="${qrData}" /></p>`;
      await sendEmail(email, "Your Certificate", html, filePath);
  
      console.log('All done!');
      res.json({ message: "Certificate issued and emailed", certificateId });
    } catch (error) {
      console.error("Error in issueCertificate:", error);
      res.status(500).json({ error: "Error issuing certificate" });
    }
  };
  
exports.getAllCerts = async (req, res) => {
  const certs = await Certificate.find();
  res.json(certs);
};
exports.verifyCert = async (req, res) => {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json(cert);
  };