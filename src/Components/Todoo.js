import React, { useState,useEffect,useRef } from 'react'
import './Todoo.css'
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";

const Todoo = () => {
    const [data,setData]=useState('')
    const [todoos,setTodoos]=useState([])
    const [editId,setEditId]=useState(0)

    const inputRef=useRef('null')

    useEffect(()=>{
        inputRef.current.focus()
    })

    const addTodo=()=>{
        if(data !== ''){
            setTodoos([...todoos,{list:data,id:Date.now(),status:false}])
        setData('')
        }
        if(editId){
            const newTodo=todoos.find((value)=>value.id===editId)
            const updateTodo=todoos.map((num)=>num.id===newTodo.id?(num={id :num.id,list:data}):(num={id:num.id,list:num.list}))
            setTodoos(updateTodo)
            setEditId(0)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const handleDelete=(id)=>{
       setTodoos( todoos.filter((to)=>to.id!==id
       ))
    }
    const handleComplete =(id)=>{
        let complete= todoos.map((list)=>{
            if(list.id === id){
            return ({...list,status:!list.status})}
            return list
        })
        setTodoos(complete)
    }
    const handleEdit=(id)=>{
        const editTodo=todoos.find((to)=>to.id===id)
        setData(editTodo.list)
        setEditId(editTodo.id)
    }
  return (
    <div className="container">
        <h1>TODO APP</h1>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={data} placeholder="Enter your todoos "ref={inputRef} className='form-control'required  onChange={(e)=>setData(e.target.value)} />
            <button onClick={addTodo}>{editId?'Edit':'Add'}</button>
        </form>
      <div className='list'>
          <ul>
           {
            todoos.map((items)=>(
                <li className='list-items' key={items.id} id={items.status?'list-items':''}>
                    <div className='list-item-list'>
                        {items.list}
                    </div>
                    <span className='logos'>
                        <MdDoneOutline
                                className='list-item-icon'
                                id='complete' 
                                title='Complete'
                                onClick={()=>handleComplete(items.id)}
                            />
                        <MdOutlineModeEdit
                                className='list-item-icon'
                                id='edit'
                                title='Edid'
                                onClick={()=>handleEdit(items.id)}
                            />   
                        <AiFillDelete 
                                className='list-item-icon'
                                id='delete' 
                                title='Delete'
                                onClick={()=> handleDelete(items.id)}
                       /> 
                    </span>
                </li>
                
            ))
           }
          </ul>
           
      </div>
    </div>
  )
}

export default Todoo