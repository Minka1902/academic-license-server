const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: isEmail,
            message: 'Email is not valid.',
        },
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        minLength: 2,
        required: true,
        maxLength: 300,
    },
});

module.exports = mongoose.model('students', studentSchema);
