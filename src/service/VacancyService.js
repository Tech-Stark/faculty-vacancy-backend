const Vacancy = require('../models/VacancyModel');
const Subscription = require('../models/SubscriptionModel');

async function getAll()
{
        const vacancies = await Vacancy.find();

        return vacancies;
}
async function getById(id)
{
    const subscriptions=await Subscription.find({profileId:id});
    const vacancies = await Vacancy.find();
    let temp=[];
    for(let i=0;i<(await subscriptions).length;i++)
    {
        for(let j=0;j<vacancies.length;j++)
        {
            if(vacancies[j].department==subscriptions[i].department&&
                (subscriptions[i].colleges.includes(vacancies[j].college)
                ||(subscriptions[i].locations.includes(vacancies[j].location))))
                {
                    temp.push(vacancies[j])
                }
        }
    }
    return temp;
    
}

module.exports = {
   getAll,
   getById
  };