const router = require("./UserController");
const subscriptionServices = require('../service/SubscriptionServics.js')


router.get('/:id', async(req, res, next) => {
   
    let subscriptions =await subscriptionServices.getbyId(req.params.id);
    res.json(subscriptions);
})

router.post('/:id', async(req, res, next) => {
   const profileId=req.params.id;
   const {locations,colleges}=req.body;
   let departments= await subscriptionServices.getByFilters({profileId,locations,colleges})
})

module.exports = router;