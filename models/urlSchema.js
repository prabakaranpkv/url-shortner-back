import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  expiryTime: Date,
  urlData: [
    {
      urlCode: String,
      longUrl: String,
      shortUrl: String,
      date: {
        type: String,
        default: Date.now,
      },
      counts: {
        type: Number,
        default: 0,
      },
    },
  ],
});
export const Users = mongoose.model("user", userSchema);
