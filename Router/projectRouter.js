import express from 'express';
import { getProjects, createProject, updateProject, changeProjectStatus } from '../Controller/projectController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.get('/get', verifyToken, getProjects);
router.post('/create', verifyToken, createProject);
router.put('/update', verifyToken, updateProject);
router.patch('/change/status', verifyToken, changeProjectStatus);

export default router;