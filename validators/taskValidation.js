import { body } from 'express-validator';

// Validation for creating a new task
const validateCreateTask = [
    body('taskName').notEmpty().withMessage('Task name is required'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
    body('status')
        .notEmpty().withMessage('status is required'),
    body('tags')
        .notEmpty().withMessage('Tags is required')
        .isArray().withMessage('Tags must be an array'),
    body('dueDate')
        .notEmpty().withMessage('dueDate is required'),
    body('project').notEmpty().withMessage('Project is required')
];

// Validation for updating a task by project name
const validateUpdateTaskByProjectName = [
    body('taskName').notEmpty().withMessage('Task name cannot be empty'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
    body('status').notEmpty().withMessage('status is required'),
    body('tags')
        .notEmpty().withMessage('Tags is required')
        .isArray().withMessage('Tags must be an array'),
    body('project').notEmpty().withMessage('Project cannot be empty')
];

// Validation for deleting a task by project name
const validateDeleteTaskByProjectName = [
    body('project').notEmpty().withMessage('Project is required')
];

export { validateCreateTask, validateUpdateTaskByProjectName, validateDeleteTaskByProjectName }