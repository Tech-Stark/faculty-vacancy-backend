const express = require('express')
const router = express.Router();
const subscriptionServices = require('../service/SubscriptionService.js')


router.get('/mysubscriptions/:id', async (req, res, next) => {
  try{
    let subscriptions =await subscriptionServices.getById(req.params.id);
    res.json(subscriptions);

  }catch(err)
  {
    res.json(err)
  }

})

router.post('/filter', async(req, res, next) => {

  try{
    const {locations,colleges}=req.body;
    let departments= await subscriptionServices.getByFilters(locations,colleges)
    console.log(departments)
     res.json(departments)

  }catch(err)
  {
    res.json(err)
  }
 
})

router.post('/mysubscriptions/:id', async(req,res,next)=>{

  try{
    const profileId=req.params.id;
    const {locations,colleges,department}=req.body;
    console.log(profileId)
    let subscription= await subscriptionServices.createSubscription(profileId,department,locations,colleges)
    res.json(subscription)

  }catch(err)
  {
    res.json(err)
  }



})

module.exports = router;