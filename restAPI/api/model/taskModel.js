import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';
//import crypto from 'crypto';
import dotenv from 'dotenv';
import argon2 from 'argon2';

dotenv.config();
const {Schema}  = mongoose;

 const taskSchema = new Schema({
 first_name: {
    type: String,
    required: [true, "kindly enter your first name!"],
   trim: true,
 },

  last_name: {
    type: String,
    required: [true, "kindly enter your last name!"],
     trim: true,
 },

  email: {
    type: String,
    required: [true, 'kindly enter your email!'],
    unique: true,
    trim: true,
  
 },

  password: {
    type: String,
    required: [true, 'kindly enter your password!'],
    minlength: [8, 'please kindly enter greater than 7 characters!'],
     trim: true,
     select: false,
 },

  password_check: {
    type: String,
    required: [true, 'kindly enter your password!'],
    minlength: [8, 'please kindly enter greater than 7 characters!'],
     trim: true,
      select: false,
 },
 
});

// Pre-save hook to remove password_check before saving to database
taskSchema.pre('save', async function (next) {
  // if(this.isModified('password')){
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
  // if (this.isModified('password')) {
  //   const saltHashedPassword = await bcrypt.hash(this.password, 10);
  //   const secret = process.env.SECRET_KEY;
  //   this.password = crypto.createHmac('sha256', secret).update(saltHashedPassword).digest('hex');
  // }
  
 if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  this.password_check = undefined; // Remove password_check before saving
  next();
});

export const Task = mongoose.model('mammi', taskSchema);

