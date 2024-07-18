import { Task } from '../Models/taskSchema.js';

const findTasksByStatus = async (req, res) => {
    try {
        const tasks = await Task.find({});
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
        res.status(500).json({ error: "Failed to fetch tasks by status" });
    }
};

export { findTasksByStatus };