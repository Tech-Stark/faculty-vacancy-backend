const Vacancy = require('../models/VacancyModel');
const Subscription = require('../models/SubscriptionModel');
const User = require('../models/UserModel')
const { v4: uuidv4 } = require('uuid');

async function createVacancy(params){
    const vacancy = new Vacancy(params);
    vacancy.vacancyId = uuidv4();
    vacancy.status = "open";
    vacancy
        .save()
}


async function closeVacancyById(vacancyId)
{
  const vacancy = await Vacancy.deleteOne({vacancyId: vacancyId});
  return (vacancy);
}

async function getAll()
{
    const vacancies = await Vacancy.find();
    return vacancies;
}
async function getById(user)
{
  
    const profile=await User.find({email:user.data});
    const profileId=profile[0].profileId
    const subscriptions=await Subscription.find({profileId});
    const vacancies = await Vacancy.find();
    let st = new Set();
    for(let i=0;i< subscriptions.length;i++)
    {
        for(let j=0;j<vacancies.length;j++)
        {
            if(vacancies[j].department==subscriptions[i].department&&
                (subscriptions[i].colleges.includes(vacancies[j].college)
                ||(subscriptions[i].locations.includes(vacancies[j].location))))
                {
                    st.add(vacancies[j])
                }
        }
    }
    return Array.from(st);
    
}

module.exports = {
   getAll,
   getById,
   createVacancy,
   closeVacancyById
  };