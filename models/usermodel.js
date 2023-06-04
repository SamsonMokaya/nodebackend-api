const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
      },
      
},
    {
    timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)