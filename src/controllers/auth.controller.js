import bvrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUSer = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 409, null, 'El correo elecectronico ya se encuentra registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return successResponse(
            res,
            201,
            {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            },
            'Usuario registrado exitosamente'
        );

    } catch (error){
        return errorResponse(
            res,
            500,
            error.message,
            'Error interno del servidor al registrar usario');
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user) {
            return errorResponse(res,
                401,
                null,
                'Credenciales invalidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return errorResponse(
                res,
                401,
                null,
                'Credenciales invalidas');
        }

        const token = jwt.sign(
            {id:user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return successResponse(
            res,
            200,
            { token },
            'Inicio de sesion exitoso'
        );
    } catch (error) {
        return errorResponse(res,
            500,
            error.message,
            'Error interno del servidor al iniciar sesion'
        );
    }
};