const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    profileId: {
        type: String,
        unique: true,
    },
    collegeId: {
        type: String,
    },
    isOpenToWork: {
        type: Boolean,
    },
    subscriptionId: {
        type: String,
    },
    dateJoined: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User =  mongoose.model("user", UserSchema);

module.exports = User;