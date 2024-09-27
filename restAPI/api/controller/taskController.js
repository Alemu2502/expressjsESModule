import { Task } from "../model/taskModel.js";
import validator from 'validator';


async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({});
        tasks?res.status(200).json(tasks):res.status(404).send({error: 'task not found'});
    } catch (error) {
        res.status(400).send({error: 'bad request'});
    }
}

async function creatNewTask(req, res) {
      const {  email, password, password_check } = req.body;

  // Validate that password and password_check match
  if (password !== password_check) {
    return res.status(400).send({ error: "Password doesn't match." });
  }
        if(!validator.isEmail(email)){
          return  res.status(400).send({error: 'please enter valid email address'});
        }

    try {
   const existingUser = await Task.findOne({email});
   if(existingUser){
    return res.status(400).send({error: 'please this email is already registerd'});
   }
       
        const new_task = new Task(req.body);
        const tasks = await new_task.save();
        tasks?res.status(201).json(tasks):res.status(400).send({error: 'bad request'});
    } catch (error) {
          console.error(error);
    }    
}

async function getTaskById(req, res) {
    try {
        const tasks = await Task.findById(req.params.taskId);
        tasks?res.status(200).json(tasks):res.status(404).send({error: 'task not found'});
    } catch (error) {
        res.status(400).send({error: 'bad request'});
    }
}

async function editTaskById(req, res) {
    try {
        const tasks = await Task.findOneAndUpdate({_id: req.params.taskId}, {$set: req.body}, {new: true, runValidators: true});
        tasks?res.status(200).json(tasks):res.status(404).send({error: 'task not found'});
    } catch (error) {
        res.status(400).send({error: 'bad request'});
    }
}

async function deleteTaskById(req, res) {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.taskId);
        tasks?res.status(204).json(tasks):res.status(404).send({error: 'task not found'});
    } catch (error) {
        res.status(400).send({error: 'bad request'});
    }
}

 async function validateEmail(req, res) {
    const { email } = req.body; // Assuming the email is sent in the request body
    try {
        if (!validator.isEmail(email)) {
            return res.status(400).send({ error: "Please enter a valid email address." });
        }

        const user = await Task.findOne({ email });
        if (user) {
            return res.status(400).send({ error: "A user is already registered with this email address." });
        }
        
        // Continue with the registration process if the email is valid and unique
    } catch (error) {
        return res.status(500).send({ error: "Internal server error." });
    }
}

export const taskLists = {getAllTasks, creatNewTask, getTaskById, editTaskById, deleteTaskById, validateEmail};