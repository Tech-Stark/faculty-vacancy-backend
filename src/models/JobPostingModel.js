const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobPostingSchema = new Schema({
    profileId:{
        type:String
    },
    department:{
        type:String
    },
    locations:{
        type:[{type:String}]
    },
    colleges:{
        type:[{type:String}]
    }
});



const JobPosting =  mongoose.model("jobposting", JobPostingSchema);

module.exports = JobPosting;