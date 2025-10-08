import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App(){
  const [todos, setTodos]= useState([])
  const [text , setText]= useState('')

  useEffect(()=>{
    fetchTodos()
  }, [])

  const fetchTodos= async()=>{
    const res= await axios.get("")
    setTodos(res.data)
  }

  const addTodo= async()=>{
    if(!text) return `Error found `
    const res= await axios.post("", {text})
    setTodos([...todos, res.data])
    setText("")
  }

  const toggleTodo= async(id)=>{
    const res= await axios.put(`${id}`)
    setTodos(todos.map((t)=> (t._id === id? res.data: t)))
  }

  const deleteTodo= async (id)=>{
    await axios.delete(`${id}`)
    setTodos(todos.filter((t)=> t._id !==id))
  }

  return (
    <div style={{maxWidth: "400px", margin: 'auto', padding: "20px"}}>
      <h1>Todo App</h1>
      <input value={text} onChange={(e)=> setText(e.target.value)} placeholder='Enter Todo' />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}

export default App;
