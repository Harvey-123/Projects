import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';
import axios from 'axios';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5001/get')
        .then(result => setTodos(result.data))
        .catch(err=>console.log(err))
    })

    const toggleTaskDone = (id) => {
        axios.put('http://localhost:5001/put/'+id)
        .then(result => {
            location.reload()
        }).catch(err=>console.log(err))
        
    };

    const removeTask = (id) => {
       axios.delete('http://localhost:5001/delete/'+id)
       .then(result=>{
        location.reload()
       }).catch(err => console.log(err))
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create setTodos={setTodos} />
            {
                todos.length === 0
                    ? <div><h2>No Task</h2></div>
                    : todos.map((todo, index) => (
                        <div className="task" key={index}>
                            <div className="checkbox" onClick={() => toggleTaskDone(todo._id)}>
                                {todo.done
                                    ? <BsFillCheckCircleFill className="icon" />
                                    : <BsCircleFill className="icon" />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className="icon" onClick={()=> removeTask(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
