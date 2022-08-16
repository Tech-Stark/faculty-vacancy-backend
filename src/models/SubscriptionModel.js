const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    subscriptionId:{
        type:String
    },
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



const Subscription =  mongoose.model("subscription", SubscriptionSchema);

module.exports = Subscription;