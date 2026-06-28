import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tags: [{ type: String }]
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  degree: { type: String },
  college: { type: String },
  location: { type: String },
  skills: [{ type: String }],
  projects: [ProjectSchema],
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Hash password before saving to db
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password inputs
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
