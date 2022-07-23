const User = require('../models/UserModel')
const Profile = require('../models/ProfileModel')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')
const { v4: uuidv4 } = require('uuid');


async function login({ email, password }) {
    const user = await User.findOne({email});

    // synchronously compare user entered password with hashed password
    if(user && bcrypt.compareSync(password, user.password)){
        const token = auth.generateAccessToken(email);
        // call toJSON method applied during model instantiation
        return {...user.toJSON(), token}
    }
}

function register(params, res){
    const user = new User(params)
    user.profileId = uuidv4(); 
    user
        .save()
        .then(() => {
            profile = new Profile({profileId : user.profileId});
            profile.save();
            res.json({success:true});
        } )
        .catch((err) => {
            res.status(400).json({success:false, msg: "A user already exists with the same email"});
        });
}
async function getById(id) {
    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getById
};