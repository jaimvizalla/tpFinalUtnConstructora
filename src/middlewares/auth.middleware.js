import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responses.js'

export const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return errorResponse(res,
                401,
                null,
                'Token requerido'
            );
        }

        const parts = authHeader.split(' ');

        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return errorResponse(
                res,
                401,
                null,
                'Formato de token invalido (debe ser Bearer <token>)'
            );
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch (error){
        return errorResponse(res,
            401,
            error.message,
            'Token invalido o expirado'
        );
    }

};
