const User = require('../models/UserModel')
const Profile = require('../models/ProfileModel')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')
const { v4: uuidv4 } = require('uuid');
const logger = require('../logging/logger');



async function login({ email, password }) {
    const user = await User.findOne({email});
   
    // synchronously compare user entered password with hashed password
    if(user && bcrypt.compareSync(password, user.password)){
        console.log("hello")
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
            res.status(400).json({success:false, msg:err});
        });
}
async function getAllUsers(){
    return await User.find();
}

async function updateUser(user){
    const updatedUser = await User.findOneAndUpdate({email: user.email}, user);
    // logger.log.trace("Updated as the following model: ")
    // logger.log.trace(updatedUser);
}

async function getById(id) {
    const user = await User.findById(id);
    return user.toJSON()
}

async function getUserByProfileId(profileId){
    const user = await User.findOne({profileId:profileId});
    return user;
}
async function getAllTeachers()
{
    const teachers=await User.find({exit:"none"});
    return teachers
}

async function getCollegeTeachers(collegeId){
    const teachers = await User.find({collegeId:collegeId, exit:{$ne:"exit"}});
    return teachers; 
}

module.exports = {
    login,
    register,
    getById,
    getAllUsers,
    updateUser,
    getUserByProfileId,
    getAllTeachers,
    getCollegeTeachers
};