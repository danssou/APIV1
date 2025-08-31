import mongoose from "mongoose";
import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.models.js"

export const CreateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        // console.log(`${SERVER_URL}/api/v1/workflows/subscription/reminder`)

        const {workflowRunId} = await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionID:subscription.id,
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

export const GetAllSubscriptions = async (req, res, next) => {
    try {
        const allSubscriptions = await Subscription.find({}); //To get all documents
        res.status(200).json({success: true, data:allSubscriptions, message:'Subscriptions on the way...'})
    } catch (error) {
        console.log("error in fetching products:", error.message);
        next(error);
    }
}


export const GetSubscriptionDetails = async (req, res, next) => {
    const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid subscription Id" });
	}

	try {
		const subscription = await Subscription.findById(id);
		res.status(200).json({ success: true, data: subscription, message: "Details on the way..." });
	} catch (error) {
		next(error)
	}


}


export const UpdateSubscription = async (req, res, next) => {
    const {id} = req.params;

    const product = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid subscription Id" });
    }

    try {
        const updatedSubscrition = await Subscription.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success:true, data: updatedSubscrition, message: "Subscription Updated successfully"})
    } catch (error) {
        next(error)
    }


}