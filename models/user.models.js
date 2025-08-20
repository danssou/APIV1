import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,
    required:[true, 'User Name is required'],
    trim: true,
    minLenght:2,
    maxLenght:50,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique:true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    minLenght:5,
    maxLenght:255,
  },

  password: {
    type: String,
    required: [true, 'User password is required'],
    minLenght:8,
  }
},{timestamps:true});


const User = mongoose.model('User', userSchema);

export default User;