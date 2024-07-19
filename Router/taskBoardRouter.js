import express from 'express';
import { findTaskByAssignedUser } from '../Controller/taskBoardController.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();
router.get('/find/task/By/AssignedUser', verifyToken, findTaskByAssignedUser);

export default router;