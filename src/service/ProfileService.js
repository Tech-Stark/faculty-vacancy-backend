const User = require('../models/UserModel')
const Profile = require('../models/ProfileModel')
const logger = require('../logging/logger.js')


function updateProfile(user, profile) {
    profile.profileId = User.findOne({email: user.data}).profileId;
    const query = Profile.findOneAndUpdate({profileId: profile.profileId}, profile);
    console.log(query)
}



function getProfile(email) {

    return User.findOne({email: email})
        .then((user) =>{
            logger.log.info("profile requested for user "+ user.profileId);
            return Profile.findOne({profileId: user.profileId})
                       
        })
}

module.exports = {
    updateProfile,
    getProfile
};