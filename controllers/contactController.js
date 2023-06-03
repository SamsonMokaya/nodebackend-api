const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })

    res.status(201).json(contact);
})

const getContact = asyncHandler(async (req, res) => {
    const contacts = Contact.find();
    res.status(200).json(contacts);
})

const getContacts = asyncHandler( async (req, res) => {
    const contacts = Contact.find();
    res.status(200).json(contacts);
})

const updateContact = asyncHandler( async (req, res) => {
    res.status(201).json({message: "Contact updated succesfully"});
})

const deleteContact = asyncHandler( async (req, res) => {
    res.status(201).json({message: "Contact deleted succesfully"});
})

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    getContacts
};