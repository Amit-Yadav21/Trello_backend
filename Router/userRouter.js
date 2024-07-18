import express from 'express';
// import { login, signup, getAllUsers, GetLoginData, UpdateLoginData, DeleteUserData, logout} from '../Controller/userController.js';
import * as userControllers from '../Controller/userController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/register', userControllers.signup);
router.post('/login', userControllers.login);
router.get('/find/all/signup/data', userControllers.getAllUsers);
router.get('/find/log/In/data', verifyToken, userControllers.GetLoginData);
router.put('/update/log/In/data/By/Email', verifyToken, userControllers.UpdateLoginData);
router.delete('/delete/log/In/data/By/Email',verifyToken , userControllers.DeleteUserData);
router.post('/logout/log/In/data', verifyToken, userControllers.logout);

export default router;