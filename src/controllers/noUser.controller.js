const NoUser = require("../models/NoUser");

const noUserCtrl = {};

noUserCtrl.create = async (req, res) => {
    const { name, email } = req.body;
    const newNoUser = new NoUser({name, email})
    newNoUser.save(function(err) {
        if(err) {
            return res.status(400).json({message: 'The email already exists'});
        }
        res.json(newNoUser)
    })
}



module.exports = noUserCtrl;