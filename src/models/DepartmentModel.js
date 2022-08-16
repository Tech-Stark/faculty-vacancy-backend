const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentSchema = new Schema({

    collegeId:{
        type:String
    },
    name:{
        type:String
    },
    vacancies:{
        type:Number
    },
    capacity:{
        type:Number
    },

});



const Department =  mongoose.model("department", DepartmentSchema);

module.exports = Department