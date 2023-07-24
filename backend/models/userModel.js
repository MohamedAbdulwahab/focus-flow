import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firebaseUserId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestaps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
