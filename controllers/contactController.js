const asyncHandler = require('express-async-handler');

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email} = req.body
    if(!name || !email){
        res.status(400);
        throw new Error("All fields are required");
    }
    res.status(201).json({message: "Create a contact"});
})

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Contact for ${req.params.id}`});
})

const getContacts = asyncHandler( async (req, res) => {
    res.status(200).json({message: "All contacts"});
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