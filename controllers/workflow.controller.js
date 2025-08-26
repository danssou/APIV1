import  {createRequire} from 'module';
import dayjs from 'dayjs';

import Subscription from '../models/subscription.models.js';

const require = createRequire(import.meta.url)


const {serve} = require('@upstash/workflow/express')

const REMINDERS = [7, 5, 2, 1];


export const sendReminders = serve(async(context) => {
    const {subcriptionID} = context.requestPayload;
    const subscription = await fetchSubscription(context, subcriptionID);

    if(!subscription || subscription.status !== 'active' ) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subcriptionID}. Stopping workflow. `);
        return;
    }

    for (const daysBefore of REMINDERS) {
    const reminderDate  = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())){


    }


});





const fetchSubscription = async (context, subcriptionID) =>{
    return await context.run('get subscription', () => {
        return Subscription.findById(subcriptionID).populate('user', 'name email');
    })
}

sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}