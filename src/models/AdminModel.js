const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
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
    id: {
        type: String,
        unique: true,
    },
    adminRole: {
        type: String,
    },
});

AdminSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const Admin =  mongoose.model("admin", AdminSchema);

module.exports = Admin;