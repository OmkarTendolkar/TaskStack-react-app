import { useState , useRef } from "react"
import uuid from 'react-uuid'
import CompletedTask from "./CompletedTask";


const TaskStack = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [completedtasks, setCompletedTasks] = useState([]);
  const [idValue, setIdValue] = useState(null);

  const taskInputElement = useRef();
  const addBtnElement = useRef();

  const handleCompleteBox = () => {
    setCompleted(!completed)
  };

  const handleTaskCheckBox = (task) => {
    setCompletedTasks([...completedtasks, task]);
    handleDeleteButton(task);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSaveButton();
    }
  }

  const handleSaveButton = () => {
    if(inputValue === ''){
      setMessage('Task field cannot be empty !!!');
      return ;
    }

    const d = new Date()
    if(addBtnElement.current.innerHTML === 'Save'){
      const todo = {
        id : uuid(),
        name : inputValue,
        dd : d.getDate(),
        mm : d.getMonth() + 1,
        yy : d.getFullYear(),
        hr : d.getHours(),
        min : d.getMinutes(),
        sec : d.getSeconds(),
      }
      setTasks([...tasks, todo]);
    }
    else{
      setTasks(
        tasks.map(task => {
          return (task.id === idValue ? {
            id : idValue,
            name : inputValue,
            dd : d.getDate(),
            mm : d.getMonth() + 1,
            yy : d.getFullYear(),
            hr : d.getHours(),
            min : d.getMinutes(),
            sec : d.getSeconds(),
          } : task)
        } )
      );
      setIdValue(null);
      addBtnElement.current.innerHTML = 'Save';
      addBtnElement.current.classList.remove('bg-cyan-400')
    }
    setInputValue('');
  };

  const handleEditButton = (task) => {
    setIdValue(task.id);
    setInputValue(task.name);
    addBtnElement.current.innerHTML = 'Update';
    addBtnElement.current.classList.add('bg-cyan-400')
    taskInputElement.current.focus();
  };

  const handleDeleteButton = (task) => {
    setTasks(
      tasks.filter(t => (
        t.id !== task.id
      ))
    );
  };

  function Task({task}) {
    return (
      <>
        <div className="flex items-center justify-center space-x-1 mb-5">
          <input type="checkbox" className="border w-[50px] text-center" onChange={() => handleTaskCheckBox(task)}/>
          <div className="flex-1 text-center">{task.name}</div>
          <div className="w-60 text-center">{task.dd + '/' + task.mm + '/' + task.yy + '  ' + task.hr + ':' + task.min + ':' + task.sec}</div>
          <div className="w-40 text-center space-x-5">
            <button className="bg-blue-600 text-white py-1 px-3 rounded-md font-semibold" onClick={() => handleEditButton(task)}>Edit</button>
            <button className="bg-red-600 text-white py-1 px-3 rounded-md font-semibold" onClick={() => handleDeleteButton(task)}>Delete</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <main className="flex items-center justify-center">
      <div className="bg-white border w-[1000px] h-[580px] px-10 py-5 rounded-xl shadow-md">

        <div className="text-2xl text-center font-medium mb-5">
          TaskStack - Manage your everyday tasks at one place
        </div>
        <div className="mb-6">
          <div className="text-xl font-medium mb-2">Add a Task</div>
          <div className="flex space-x-5">
            <input ref={taskInputElement}  className="flex-1 rounded shadow-inner outline-none px-3 border " placeholder="Enter your daily task" type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <button ref={addBtnElement} className="bg-green-500 text-white font-semibold py-1 px-4 rounded" 
            type="button" onClick={handleSaveButton}>
              Save
            </button>
          </div>
          {message && <div className="text-red-600 text-sm font-semibold mt-1">{message}</div>}
          <div className="mt-5">
            <input className="w-4 h-4 border align-middle mr-2" type="checkbox" onChange={handleCompleteBox}/>
            <span className="align-middle">Show completed tasks</span>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <hr className="border-stone-400 border-2 w-[650px] rounded-full" />
        </div>

        { completed ? 
          
          (<div>
            <div>
              <div className="text-xl font-medium mb-2">
                Completed Tasks
              </div>
              <div className="flex items-center justify-center mb-5 font-medium text-lg">
                <div className="flex-1 text-center">Tasks</div>
                <div className="w-60 text-center">Added Timestamp</div>
                <div className="w-60 text-center">Completed Timestamp</div>
              </div>
            </div>

            <div className=" h-[250px] overflow-auto">
              {completedtasks.map(task => (
                <CompletedTask key={task.id} task={task} />
              ))}
            </div>
          </div>)
           :
           (<div>
              <div>
                <div className="text-xl font-medium mb-2">
                  Pending Tasks
                </div>
                <div className="flex items-center justify-center mb-5 font-medium text-lg">
                  <div className="w-[50px] text-center">Tick</div>
                  <div className="flex-1 text-center">Task Name</div>
                  <div className="w-60 text-center">Timestamp</div>
                  <div className="w-40 text-center">Button</div>
                </div>
              </div>

              <div className=" h-[250px] overflow-auto">
                {tasks.map(task => (
                  <Task key={task.id}  task={task} />
                ))}
              </div>
            </div>)
        }
      </div>
    </main>
  )
}

export default TaskStack