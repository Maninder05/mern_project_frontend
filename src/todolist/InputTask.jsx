import './ListStyle.css'

function InputTask({task,setTask,addTask}){
    return(
        <>
           <div>
                <center>
                    <input className="input" name="task" value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder='Enter Task Here'/>
                    <button className='add-btn' type="submit" onClick={addTask}>Add</button>                   
                </center>               
            </div> 
        </>
    )
}
export default InputTask;