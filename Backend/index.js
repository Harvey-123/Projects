const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Models');

const app = express();
app.use(cors());
app.use(express.json())

//Server and Database Connection
const PORT = 5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})

mongoose.connect('mongodb+srv://eullaranczraharveyccs:pvY7wukQ60jTdc0m@todolistcluster.hswlgpf.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=> console.log("Connected to Database"))
  .catch(err => console.error("Failed to connect on database", err));


//add  
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err));

})

//fetch
app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

//Edit or update
app.put('/put/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id:id}, {done: true})
    .then(result => res.json(result))
    .catch(err=> res.json(err));
})


//delete
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

