const express = require("express");
const router = express.Router();
const {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    getContacts
} = require("../controllers/contactController")

router.route("/").post(createContact).get(getContacts)

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

  module.exports = router;