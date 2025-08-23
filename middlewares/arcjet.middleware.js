import aj from "../config/arcjet.js";


const arcjetMiddleware = async (req, res, next) => {
    try {
        // Log IP address and request info
        // console.log('Arcjet Middleware: IP:', req.ip, 'Requested:', 1);
        const decision = await aj.protect(req, {requested: 1});
        // Log the full decision object for debugging
        // console.log('Arcjet Decision:', JSON.stringify(decision, null, 2));

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                console.log('Rate limit triggered for IP:', req.ip);
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }

            if (decision.reason.isBot()) {
                console.log('Bot detected for IP:', req.ip);
                return res.status(403).json({ error: 'Bot detected' });
            }

            console.log('Access denied for IP:', req.ip, 'Reason:', decision.reason);
            return res.status(403).json({ error: 'Access Denied' });
        }

        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error ${error}`);
        next(error);
    }
}


export default arcjetMiddleware;