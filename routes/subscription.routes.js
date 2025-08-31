import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { CreateSubscription, GetAllSubscriptions, GetSubscriptionDetails, GetUserSubscriptions, UpdateSubscription } from "../controllers/subscription.controller.js";




const subscriptionRouter = Router();

subscriptionRouter.get('/',authorize, GetAllSubscriptions)

subscriptionRouter.get('/:id', authorize, GetSubscriptionDetails)

subscriptionRouter.post('/', authorize , CreateSubscription) //create

subscriptionRouter.put('/:id', authorize, UpdateSubscription)

subscriptionRouter.delete('/:id', (req, res) => res.send({title: "DELETE subscription"}))

subscriptionRouter.get('/user/:id', authorize, GetUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: "CANCEL  subscription"}))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: "GET upcoming renewals"}))




export default subscriptionRouter;