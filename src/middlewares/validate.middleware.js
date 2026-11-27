import { errorResponse } from '../utils/responses.js';

export const validate = (schema) => (req, res, next) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
        const errorMessages = validation.error.issues.map(issue => issue.message).join(', ');
        return errorResponse(res, 400, null, errorMessages);
    }

    req.body = validation.data;
    next();
};