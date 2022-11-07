import React from 'react'

import './todo.css'

const getLocalItem=()=>{
  let data=localStorage.getItem('list')
  if(data){
    return JSON.parse(data)
  }else{
    return []
  }

} 
function Todo() {
const[todo,setTodo]=React.useState('');

const[list,toList]=React.useState(getLocalItem());
const[show,setShow]=React.useState(false)
const[editindex,setEdit]=React.useState()

//store in localStorage
React.useEffect(()=>{
localStorage.setItem("list",JSON.stringify(list))
},[list])


//Add a task
const AddList=(e)=>{
e.preventDefault() 
toList([...list,todo])
setTodo('')
}


//remove a task
const remove=(e)=>{
  const filt=list.filter( (value,index)=>{
    return  index!==e
  })
 toList(filt)

}

//edit 
const edit=(e)=>{
  setTodo(list[e])
setShow(true)
setEdit(e)
  }

  //after edit update
   const Update=(e)=>{
e.preventDefault()
list.splice(editindex,1,todo)
toList([...list])
setTodo('')
setShow(!show)
   }
   


  return (
    <div className='heading'>
      <h2>What's the Plan for Today?</h2>
      <div className='row'>
      <form className='todo'>
        <input  type="text" placeholder='Add Todo here' value={todo} onChange={(e)=>{
            setTodo(e.target.value)
        }} />
        {!show?<button  disabled={!todo} className='btn' onClick={AddList}>Add</button>
        :<button   className='btn' onClick={Update}>Update</button>}
      </form>
      <>
      <div className='row'>
      {
        list.map((list,index)=>{
            return(
                <div  className='col'>
                      
                    <h1>{list}</h1>
                    <div className='buttons'>
                    <button onClick={()=>remove(index)}>Delete</button>
                    <button onClick={()=>edit(index)}>edit</button>
                    </div>
                </div>
            )
        })
      }
      </div>
      </>
      </div>
    </div>
  )
}

export default Todo
