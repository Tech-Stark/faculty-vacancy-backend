const Subscription = require('../models/SubscriptionModel');


async function getById(id) {

    const subscriptions = await Subscription.find({profileId:id});
    // call toJSON method applied during model instantiation
    return subscriptions.toJSON()
}

async function getById(id) {

    const subscriptions = await Subscription.find({profileId:id});
    // call toJSON method applied during model instantiation
    return subscriptions.toJSON()
}

module.exports = {
  getById
};