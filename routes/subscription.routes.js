import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { 
    CancelSubscription, 
    CreateSubscription, 
    DeleteSubscription, 
    GetAllSubscriptions, 
    GetSubscriptionDetails, 
    UpcomingRenewals, 
    GetUserSubscriptions, 
    UpdateSubscription 
} from "../controllers/subscription.controller.js";




const subscriptionRouter = Router();

subscriptionRouter.get('/',authorize, GetAllSubscriptions)

subscriptionRouter.get('/:id', authorize, GetSubscriptionDetails)

subscriptionRouter.post('/', authorize , CreateSubscription) //create

subscriptionRouter.put('/:id', authorize, UpdateSubscription)

subscriptionRouter.delete('/:id',authorize, DeleteSubscription)
 
subscriptionRouter.get('/user/:id', authorize, GetUserSubscriptions)

subscriptionRouter.put('/:id/cancel', authorize, CancelSubscription)

subscriptionRouter.get('/upcoming-renewals', UpcomingRenewals)




export default subscriptionRouter;