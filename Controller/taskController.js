import { Task } from '../Models/taskSchema.js';
import { Project } from '../Models/projectSchema.js';

const createNewTask = async (req, res) => {
    const { taskName, description, status, tags, dueDate, project } = req.body;
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
            dueDate,
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
        const tasks = await Task.find({});
        res.status(200).json({ message: "All Task find successfully", tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tasks by email" });
    }
};

const findTaskByAssignedUser = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedUser: req.user.email });
        if (!tasks || tasks.length === 0) {
            return res.status(401).json({ message: "No tasks found for the assigned user" });
        }

        const groupedTasks = {
            Backlog: [],
            InDiscussion: [],
            InProgress: [],
            Done: []
        };

        tasks.forEach(task => {
            groupedTasks[task.status.replace(' ', '')].push(task);
        });

        res.status(200).json({ message: "Tasks grouped by status fetched successfully", tasks: groupedTasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while fetching the tasks" });
    }
};

const updateTaskByProjectName = async (req, res) => {
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

export { createNewTask, findAllTask, findTaskByAssignedUser, updateTaskByProjectName, deleteTaskByProjectName };
