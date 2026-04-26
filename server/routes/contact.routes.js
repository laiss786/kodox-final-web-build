// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, getContacts);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

module.exports = router;
