import User from "../models/user.models.js";


//Get all Users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // getting all the users

        res.status(200).json({success: true, data:users})
    } catch (error) {
        next(error);
    }
}
//Get a unique user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // getting user details whithout it's password
        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data:user})
    } catch (error) {
        next(error);
    }
}
