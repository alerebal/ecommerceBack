const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const noUserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true}
}, {
    timestamps: true
})

noUserSchema.plugin(uniqueValidator)

module.exports = model('noUser', noUserSchema);