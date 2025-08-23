import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        
    } catch (error) {
        console.log(`Arcjet Middleware Error ${error}`);
        next(error);
    }
}