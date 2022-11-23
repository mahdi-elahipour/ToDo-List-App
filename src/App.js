import React, { useState, createContext } from 'react';
import style from './Styles/style.module.css';
import './Styles/fontStyle.css';
import AddToDo from './Components/AddToDo';
import ToDos from './Components/ToDos';
import trash from './Icons/trash.svg';
import update from './Icons/pen.svg';
import mark from './Icons/check.svg';
import FilterButtons from './Components/FilterButtons';
import TaskFilter from './Components/TaskFilter';
import UpdateToDo from './Components/UpdateToDo';

export const UpdateContext = createContext();
function App(props) {
    const [toDo, setToDo] = useState([]);
    const [taskFilter, setTaskFilter] = useState([]);
    const [falsytruthy, setFalsyTruthy] = useState(true);
    const [wordLengthAlert, setWordLengthAlert] = useState('');
    //Temp States
    const [newTask, setNewTask] = useState('');
    const [toDoCheckUpdate, setToDoCheckUpdate] = useState('');

    // add ToDo to List
    function addToDo(e) {
        let task;
        task = {
            id: toDo.length + 1,
            title: newTask,
            status: false
        }
        setToDo([...toDo, task]);
        e.target.previousSibling.value = '';

    }
    //delete ToDo from List
    function deleteToDo(id) {
        const newTask = toDo.filter(task => {
            if (task.id !== id) {
                return task;
            }
            return false;
        })
        setToDo(newTask);
    }
    //check selected item in list for Update
    function checkForUpdate(id) {
        const tIndex = toDo.findIndex((task) => {
            if (task.id === id) {
                return task;
            }
            return false;

        })
        setToDoCheckUpdate(toDo[tIndex])
    }
    //cancel update
    function cancelUpdate() {
        setToDoCheckUpdate('')
    }
    //update ToDo
    function updateToDo(id) {
        console.log(id)
        const newTask = toDo.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    title: toDoCheckUpdate.title,
                }
            }
            return task;
        })

        setToDo(newTask)
    }
    //mark as completed or uncompleted
    function markOn(id) {
        const newTask = toDo.map(task => {
            if (task.id === id) {
                return { ...task, status: !task.status }
            }
            return task;
        })
        setToDo(newTask);

    }

    function handleChange(e) {
        e.target.classList.remove(style.warning)
        let target = e.target.name;
        function limitLength(text) {
            const foundedWord = text.split(" ")
            const filteredWord = foundedWord.map(word => {
                if (word.length < 14) {
                    setWordLengthAlert('')
                    return `${word} `;
                } else {
                    setWordLengthAlert('The number of characters allowed for each word is 14, otherwise the word will be shortened')
                    const newWord = word.slice(0, 13);
                    return `${newWord} `;
                }
            })
            return filteredWord;
        }
        if (target === 'addToDoInput') {
            setNewTask(limitLength(e.target.value));

        }
        else
            setToDoCheckUpdate({ ...toDoCheckUpdate, title: e.target.value })
    }
    //filter task as completed
    function completed(e) {
        const filteredTasks = toDo.filter(task => {
            if (task.status === true) {
                return task;
            }
            return false;

        })
        setTaskFilter(filteredTasks)
        falsytruthy ? setFalsyTruthy(!falsytruthy) : setFalsyTruthy(falsytruthy)

    }
    //filter task as uncompleted
    function uncompleted(e) {
        const filteredTasks = toDo.filter(task => {
            if (task.status === false) {
                return task;
            }
            return false;

        })
        setTaskFilter(filteredTasks)
        falsytruthy ? setFalsyTruthy(!falsytruthy) : setFalsyTruthy(falsytruthy)

    }
    //show all task
    function allTasks(e) {
        const tasks = toDo.map(task => {
            return task;
        })
        setToDo(tasks)
        setFalsyTruthy(true)
    }

    return (
        <div className={style.container}>
            {wordLengthAlert && <div className={style.wordLengthAlert}>{wordLengthAlert}</div>}
            <h3>To Do List</h3>
            {
                toDoCheckUpdate &&

                // Update ToDo Component

                <UpdateToDo

                    style={style}
                    cancelUpdate={cancelUpdate}
                    handleChange={handleChange}
                    toDoCheckUpdate={toDoCheckUpdate}
                    updateToDo={updateToDo}

                />
            }

            {/* Add ToDo Component */}

            <AddToDo style={style.addToDoForm} newtask={newTask} changeHandler={(e) => handleChange(e)} warningStyle={style.warning} addtodo={(e) => addToDo(e)} />
            {toDo && toDo.length ? '' : <p style={{ textAlign: "center", padding: "10px" }}>no task is defined...</p>}

            {/* Task Filter(Completed,Uncompleted,All Tasks) */}

            <TaskFilter falsytruthy={falsytruthy} style={style} taskFilter={taskFilter} />

            <UpdateContext.Provider value={{ willUpdateTask: checkForUpdate, deleteTask: deleteToDo, markTask: markOn, trashIcon: trash, updateIcon: update, markIcon: mark }}>
                {
                    toDo && falsytruthy && <ToDos todos={toDo} style={style} />
                }
            </UpdateContext.Provider>
            
            {/* filter buttons */}
            <FilterButtons
                style={style}
                toDo={toDo}
                completed={completed}
                uncompleted={uncompleted}
                allTasks={allTasks}
            />

        </div>
    );
}

export default App;