// controllers/contact.controller.js
const Contact = require('../models/Contact.model');
const nodemailer = require('nodemailer');
const Joi = require('joi');

// Joi validation schema (OWASP A03: Injection prevention)
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().max(20).optional().allow(''),
  subject: Joi.string().trim().max(200).optional().allow(''),
  message: Joi.string().trim().min(10).max(2000).required(),
});

// Nodemailer transporter
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// @desc   Submit contact form
// @route  POST /api/contact
// @access Public
exports.submitContact = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(', '),
      });
    }

    // Save to DB
    const contact = await Contact.create({
      ...value,
      ipAddress: req.ip,
    });

    // Send email notification (non-blocking)
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Kodox Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `New Contact: ${value.subject || value.name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#7C3AED">New Contact from Kodox Website</h2>
            <p><strong>Name:</strong> ${value.name}</p>
            <p><strong>Email:</strong> ${value.email}</p>
            ${value.phone ? `<p><strong>Phone:</strong> ${value.phone}</p>` : ''}
            <p><strong>Message:</strong><br/>${value.message.replace(/\n/g, '<br/>')}</p>
            <hr/>
            <small>Received at ${new Date().toLocaleString()}</small>
          </div>
        `,
      });
    } catch (emailErr) {
      // Email failure should NOT fail the API response
      console.error('Email notification failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will contact you shortly!',
      data: { id: contact._id },
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all contact messages (admin)
// @route  GET /api/contact
// @access Admin
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    next(err);
  }
};

// @desc   Mark message as read
// @route  PATCH /api/contact/:id/read
// @access Admin
exports.markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete message
// @route  DELETE /api/contact/:id
// @access Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
