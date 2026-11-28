import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/user.validator.js';

const userRouter = Router();

userRouter.post('/register', validate(registerSchema), register);
userRouter.post('/login', validate(loginSchema), login);

export default userRouter
