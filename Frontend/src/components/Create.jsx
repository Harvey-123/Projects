import React, {useState} from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState()
  const handleAddTask = () =>{
    axios.post('http://localhost:5001/add', {task: task})
    .then(result => {
        location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="create_form">
      <input 
        type="text" 
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAddTask}>Add</button>
    </div>
  )
}

export default Create