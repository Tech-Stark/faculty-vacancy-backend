const User = require('../models/UserModel')
const Profile = require('../models/ProfileModel')
const logger = require('../logging/logger.js')


function updateProfile(email, profile, res) {
    User.findOne({email: email})
        .then((curUser) => {
            console.log(curUser);
            profile.profileId = curUser.profileId;
            console.log(profile)
            return Profile.findOneAndUpdate({profileId: curUser.profileId}, profile);            
        })
        .then(()=>{
            res.json({success:true});
        })
        .catch(() =>{
            res.status(400).json({success:false, msg: "Profile Update Unsuccessful"})
        });
}



function getProfile(email) {

    return User.findOne({email: email})
        .then((user) =>{
            logger.log.info("profile requested for user "+ user.profileId);
            return Profile.findOne({profileId: user.profileId})
                       
        })
}

function getProfileByProfileId(profileId) {

    const profile =  Profile.findOne({profileId})
    return profile;
}

module.exports = {
    updateProfile,
    getProfile,
    getProfileByProfileId
};