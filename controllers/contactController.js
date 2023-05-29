const createContact = (req, res) => {
    console.log(req.body)
    res.status(201).json({message: "Create a contact"});
}

const getContact = (req, res) => {
    res.status(200).json({message: `Contact for ${req.params.id}`});
}

const getContacts = (req, res) => {
    res.status(200).json({message: "All contacts"});
}

const updateContact = (req, res) => {
    res.status(201).json({message: "Contact updated succesfully"});
}

const deleteContact = (req, res) => {
    res.status(201).json({message: "Contact deleted succesfully"});
}

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    getContacts
};