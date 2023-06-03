const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }
  
    res.status(200).json({ message: 'Contact deleted successfully' });
  });
  

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
  getContacts,
};
