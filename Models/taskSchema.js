import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Backlog', 'In Discussion', 'In Progress', 'Done'], default: 'Backlog' },
  tags: [{ type: String }],
  dueDate: { type: Date, default: Date.now },
  assignedUser: { type: String, ref: 'User' },
  project: { type: String, ref: 'Project', required: true }
});

const Task = mongoose.model('Task', taskSchema);

export {Task};