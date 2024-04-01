import React,{useState} from "react";
import InputTask from "./InputTask";
import UpdateTasks from "./UpdateTasks";
import './ListStyle.css'

function ToDoList(){
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [count,setCount]=useState(0);                                       

    const addTask =()=>{
        if(task!==''){
        setCount(count+1);                                                    //count state is taken as id of distinct objs instead of tasks.length+1 as it doesn't lead to any type of similar id conflicts when certain obj is being cleared, else new obj added will hv same id as last obj of ary 
        setTasks([...tasks,{ id: count, task:task, complete: false}]);        //array cannot be mutated directly hence it must be destructured first using spread optr(...)
        setTask("")
        }
    }    
    function deleteTask(id){
        const newTasks=tasks.filter((obj)=>{                                   
            return obj.id!==id; 
        })
        //OR
        /*const newTasks=[...tasks];
        newTasks.splice(id,1)                  //remove one element from given id(i.e. index specifically)
        */
        setTasks(newTasks);
    }
    function completedTask(id){
        const updatedTasks= tasks.map(obj => {
          return obj.id === id ? { ...obj,complete: !obj.complete } : {...obj};       //if obj has same id as done task id then copy obj and update val of complete else return the original obj
        });
        setTasks(updatedTasks);
    }
    return(
        <>
            <div>
               <center>
               <h2 style={{marginTop:"20px"}}>TO DO LIST</h2>
               <InputTask task={task} setTask={setTask} addTask={addTask}/>
               <UpdateTasks tasks={tasks} deleteTask={deleteTask}  completedTask={completedTask}/>
               </center>
            </div>
        </>
    )

}
export default ToDoList;