import { body } from 'express-validator';

// Validation for creating a new task
const validateCreateTask = [
    body('taskName')
        .notEmpty().withMessage('TaskName field is required')
        .isString().withMessage('TaskName must be a string'),
    body('description')
        .notEmpty().withMessage('Description field is required')
        .isString().withMessage('Description must be a string'),
    body('status')
        .notEmpty().withMessage('status field is required')
        .isString().withMessage('status must be a string'),
    body('tags')
        .notEmpty().withMessage('Tags field is required')
        .isArray().withMessage('Tags must be an array'),
    body('dueDate')
        .notEmpty().withMessage('dueDate field is required')
        .isString().withMessage('dueDate must be a string'),
    body('project')
        .notEmpty().withMessage('Project is required')
        .isString().withMessage('Project must be a string'),
];

// Validation for updating a task by project name
const validateUpdateTaskByProjectName = [
    body('taskName')
        .notEmpty().withMessage('TaskName field cannot be empty')
        .isString().withMessage('TaskName must be a string'),
    body('description')
        .notEmpty().withMessage('Description field is required')
        .isString().withMessage('Description must be a string'),
    body('status')
        .notEmpty().withMessage('status field is required')
        .isString().withMessage('status must be a string'),
    body('tags')
        .notEmpty().withMessage('Tags field is required')
        .isArray().withMessage('Tags must be an array'),
    body('project')
        .notEmpty().withMessage('Project field cannot be empty')
        .isString().withMessage('Project must be a string'),
];

// Validation for deleting a task by project name
const validateDeleteTaskByProjectName = [
    body('project')
        .notEmpty().withMessage('Project field is required')
        .isString().withMessage('Project must be a string'),
];

export { validateCreateTask, validateUpdateTaskByProjectName, validateDeleteTaskByProjectName }