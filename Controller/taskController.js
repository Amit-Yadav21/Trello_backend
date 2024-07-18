import { Task } from '../Models/taskSchema.js';
import { Project } from '../Models/projectSchema.js';

const createTask = async (req, res) => {
    const { taskName, description, status, tags, project } = req.body;
    const { email } = req.user;

    try {
        // Check if assigned user exists
        const taskExists = await Task.findOne({ taskName, project, assignedUser: req.user.email });
        if (taskExists) {
            return res.status(400).json({ message: `Task already assigned this user :- ${email}` });
        }

        // Check if project exists
        const projectExists = await Project.findOne({ name: project });
        if (!projectExists) {
            return res.status(400).json({ error: "Project does not exist" });
        }

        const newTask = new Task({
            taskName,
            description,
            status,
            tags,
            assignedUser: email,
            project: projectExists.name
        });

        await newTask.save();
        res.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

const findAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ message: "All Task find successfully", tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tasks by email" });
    }
};

const findSingleTask = async (req, res) => {
    const { project } = req.body;
    const { email } = req.user;
    try {
        const tasks = await Task.find({ project, assignedUser: email });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: "Task not available." });
        }
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tasks by email" });
    }
};

const updateTask = async (req, res) => {
    const { taskName, newName, description, status, tags, project } = req.body;
    const { email } = req.user;

    try {
        const checkTasks = await Task.find({ project, assignedUser: email });
        if (!checkTasks || checkTasks.length === 0) {
            return res.status(404).json({ error: "Project and assigned user not available." });
        }

        const task = await Task.findOne({ project, assignedUser: email });
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { assignedUser: email },
            {
                taskName: newName || taskName,
                description: description || task.description,
                status: status || task.status,
                tags: tags || task.tags,
                project: project || task.project
            },
            { new: true }
        );

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update task" });
    }
};

const deleteTaskByProjectName = async (req, res) => {
    const { project } = req.body;


    try {
        const deletedTask = await Task.findOneAndDelete({ project: project });

        if (!deletedTask || deletedTask.length === 0) {
            return res.status(404).json({ message: "No tasks found to delete" });
        }
        res.status(200).json({ message: "Tasks deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete tasks" });
    }
};

export { createTask, findAllTask, findSingleTask, updateTask, deleteTaskByProjectName };
