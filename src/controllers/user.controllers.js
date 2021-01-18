const userCtrl = {};

const User = require('../models/User');
const jwt = require('jsonwebtoken');

userCtrl.signUp = async (req, res) => {
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    newUser.save(function (err) {
        if (err) {
            return res.status(400).json({ message: 'The email already exists' });
        }
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY);
        const newUserId = newUser._id;
        res.status(200).json({ token, newUserId });
    })
}

userCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(400).json({message: 'Email or password incorrect'});
    } else  {
        const match = await user.matchPassword(password);
        if(!match) {
            return res.status(400).json({message: 'Email or password incorrect'});
        } else {
            const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
            const userId = user._id;
            return res.status(200).json({token, userId});
        }
    }
}


userCtrl.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
}



module.exports = userCtrl;