import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  user: { type: String, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'canceled'], default: 'active' }
});

const Project = mongoose.model('Project', projectSchema);

export { Project }