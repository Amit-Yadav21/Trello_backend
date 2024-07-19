import express from 'express';
import { getAllProjects, getProjects, createProject, updateProject, changeProjectStatus } from '../Controller/projectController.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

router.get('/get/all', getAllProjects);
router.get('/get', verifyToken, getProjects);
router.post('/create', verifyToken, createProject);
router.put('/update', verifyToken, updateProject);
router.patch('/change/status', verifyToken, changeProjectStatus);

export default router;