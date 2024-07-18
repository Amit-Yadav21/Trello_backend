import mongoose from 'mongoose';
import moment from 'moment-timezone';
const Schema = mongoose.Schema;

// Define the time zone for India
const indianTimeZone = 'Asia/Kolkata';

// Function to get the current IST date-time
const getCurrentISTDateTime = () => moment().tz(indianTimeZone).format('YYYY-MM-DD HH:mm:ss');

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, 'Task name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
      message: 'Status is not valid',
    },
    default: 'Backlog',
  },
  tags: [{
    type: String,
  }],
  assignedUser: {
    type: String,
    ref: 'User',
    required: [true, 'Assigned user is required'],
  },
  project: {
    type: String,
    ref: 'Project',
    required: [true, 'Project is required'],
  },
  createdAt: {
    type: String,
    default: getCurrentISTDateTime,
    immutable: true,
  },
  dueDate: {
    type: String,
    required: [true, 'Due date is required'],
  },
});

const Task = mongoose.model('Task', taskSchema);
export { Task };