import express from 'express';
import { getAllProjects, getProjects, createProject, updateProject, changeProjectStatus } from '../Controller/projectController.js';
import { verifyToken } from '../middleware/authentication.js';
import {validatecreateProject, validateupdateProject, validatechangeProjectStatus} from '../validators/projectValidation.js';

const router = express.Router();

router.get('/get/all', getAllProjects);
router.get('/get', verifyToken, getProjects);
router.post('/create',validatecreateProject, verifyToken, createProject);
router.put('/update',validateupdateProject, verifyToken, updateProject);
router.patch('/change/status',validatechangeProjectStatus, verifyToken, changeProjectStatus);

export default router;