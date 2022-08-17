const mongoose = require("mongoose");
const { Schema } = mongoose;

const VacancySchema = new Schema({
    vacancyId:{
        type:String,
        unique: true,
        required: true
    },
    position:{
        type:String
    },
    department:{
        type:String
    },
    college:{
        type:String
    },
    location:{
        type:String
    },
    minimumQualification:{
        type:String
    },
    minimumExperience:{
        type:String
    },
    compensation:{
        type:String
    },
    numberOfVacancies:{
        type:Number
    },
    dateCreated:{
        type:Date
    }
});



const Vacancy =  mongoose.model("vacancy", VacancySchema);

module.exports = Vacancy;