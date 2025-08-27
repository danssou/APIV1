import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.models.js"

export const CreateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const {workflowRunId} = await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId:subscription.id,
            },
            headers:{
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({success: true, data: {subscription, workflowRunId} })
    } catch (e) {
        next(e)
    }
}



export const GetUserSubscriptions = async (req, res, next) => {
    try {
        // Check if the user match with the token (using the auth middleware)

        if(req.user.id !== req.params.id ) {
            const error = new Error('Youre not the owner of this account');
            error.status = 401;
            throw error;
        }


        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({success: true, data:subscriptions});


    } catch (error) {
        next(error)
    }
}