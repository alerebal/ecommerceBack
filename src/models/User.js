const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{
    timestamps: true
})

userSchema.plugin(uniqueValidator);

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = model('User', userSchema);