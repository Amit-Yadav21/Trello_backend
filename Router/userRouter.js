import express from 'express';
// import { login, signup, getAllUsers, GetLoginData, UpdateLoginData, DeleteUserData, logout} from '../Controller/userController.js';
import * as userControllers from '../Controller/userController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

// login/Signup router
router.post('/register/user', userControllers.signup);
router.post('/login/user', userControllers.login);
router.get('/get/signup/user', userControllers.getAllUsers);
router.get('/login/user/data', verifyToken, userControllers.GetLoginData);
router.put('/update/login/userByEmail', verifyToken, userControllers.UpdateLoginData);
router.delete('/delete/login/userByEmail',verifyToken , userControllers.DeleteUserData);
router.post('/logout/login/userData', verifyToken, userControllers.logout);

export default router;