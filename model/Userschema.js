const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {  // Corrected the typo in the field name
        type: String,
        required: true
    },
    activeState: {  // Adjusted the field name to follow common naming conventions
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);
