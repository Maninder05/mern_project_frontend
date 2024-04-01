import './ListStyle.css'

function UpdateTasks({tasks,completedTask,deleteTask})
{
  return(
    <>
      {tasks.length > 0 
        ? <>           
            <h2 style={{marginTop:"15px"}}>Pending Tasks 📝</h2><hr/>
            <div>
            {tasks.map((obj,index)=>{                                                                 //map.(currentEle/obj,index,arry of obj)                                   
              return obj.complete === false &&
                <div className="pending-task">
                  <div className="input-div" key={index}>{obj.task}</div>
                  <div className="btn-div">
                    <button className="btnn" onClick={()=>{deleteTask(obj.id)}}>Delete</button>        {/*A callback fxn is preferable when we hv to pass args in certain fxn*/}
                    <button className="btnn" onClick={()=>{completedTask(obj.id)}}>Done</button>
                  </div>  
                </div>
            })} 
            </div> 
            <h3 style={{marginTop:"15px"}}>Completed Tasks ✅</h3><hr/>
            <div>
            {tasks.map((obj,index)=>{                                                                  {/*distinct maps are taken for both tasks(pend/compl) so as to keep <h1/> heading outside else it would be repeated every time when a new task is added to the array*/}             
              return obj.complete &&
                <div className="completed-task"> 
                  <div className="input-div" key={index}>{obj.task}</div>
                  <div className="btn-div">
                    <button className="dlt-btn" onClick={()=>{deleteTask(obj.id)}}>Delete</button>     {/*deleteTask(index) must be used in case of splice method*/}    
                  </div> 
                </div>
            })} 
            </div>              
          </> 
        : <div className="pending-task">
            <div className="input-div">No Task Found</div>
          </div>  
      }
    </>
  ) 
}
export default UpdateTasks;

//NOTE:
/*
  $.("#deleteTask").click(deleteTask)                               dltTask fxn will be triggered after click as fxn's ref is handed to the event 
  $.("#deleteTask").click(deleteTask(para));                        dltTask fxn will get triggered before click event as it's already invoked inside the event
  $.("#deleteTask").click(()=>{deleteTask(para)});                  thus an anonymous callbck fxn has to be handed to the event that'll get invoked only after the event
*/

