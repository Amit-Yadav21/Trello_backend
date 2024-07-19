import express from 'express';
import { findTaskByAssignedUser, getProjectsAssignedUser, finalResponse } from '../Controller/dashboardController.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

router.get('/Dashboard', verifyToken, findTaskByAssignedUser, getProjectsAssignedUser, finalResponse);

export default router;
