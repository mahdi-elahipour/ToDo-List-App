import React, { useEffect, useState } from 'react';
import style from './style.module.css'
function App(props) {
    const [toDo, setToDo] = useState([
        { id: 1, title: 'task 1', status: false },
        { id: 2, title: 'task 2', status: false }
    ])
    const [taskFilter, setTaskFilter] = useState([]);
    const [falsytruthy, setFalsyTruthy] = useState(true);
    const [wordLentgthAlert, setWordLengthAlert] = useState('');
    //Temp States
    const [newTask, setNewTask] = useState('');
    const [toDoCheckUpdate, setToDoCheckUpdate] = useState('');


    function addToDo(e) {
        let task;
        task = {
            id: toDo.length + 1,
            title: newTask,
            status: false
        }
       setToDo([...toDo, task]);
       e.target.previousSibling.value='';
       
    }

    function deleteToDo(id) {
        const newTask = toDo.filter(task => {
            if (task.id !== id) {
                return task;
            }
        })
        setToDo(newTask);
    }

    function checkForUpdate(id) {
        const tIndex = toDo.findIndex((task) => {
            if (task.id === id) {
                return task;
            }


        })
        setToDoCheckUpdate(toDo[tIndex])
    }

    function cancelUpdate() {
        setToDoCheckUpdate('')
    }
    function updateToDo(id) {
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
    function completed(e) {
        const filteredTasks = toDo.filter(task => {
            if (task.status === true) {
                return task;
            }

        })
        setTaskFilter(filteredTasks)
        falsytruthy ? setFalsyTruthy(!falsytruthy) : setFalsyTruthy(falsytruthy)

    }
    function uncompleted(e) {
        const filteredTasks = toDo.filter(task => {
            if (task.status === false) {
                return task;
            }
        })
        setTaskFilter(filteredTasks)
        falsytruthy ? setFalsyTruthy(!falsytruthy) : setFalsyTruthy(falsytruthy)

    }
    function allTasks(e) {
        const tasks = toDo.map(task => {
            return task;
        })
        setToDo(tasks)
        setFalsyTruthy(true)
    }

    return (
        <div className={style.container}>
            {wordLentgthAlert && <div className={style.wordLengthAlert}>{wordLentgthAlert}</div>}
            <h3>To Do List</h3>
            {toDoCheckUpdate && <span className={style.updateToDoForm}><button onClick={() => cancelUpdate()}>Cancel</button><input type='text' name='updateToDoInput' onChange={(e) => handleChange(e)} value={toDoCheckUpdate.title} /><button onClick={() => updateToDo(toDoCheckUpdate.id)}>Update</button></span>}
            <span className={style.addToDoForm}><input type='text' name='addToDoInput' value={newTask.title} onChange={(e) => handleChange(e)} /><button onClick={(e) => e.target.previousSibling.value ? addToDo(e):e.target.previousSibling.classList.add(style.warning)}>Add ToDo</button></span>
            {toDo && toDo.length ? '' : <p style={{ textAlign: "center", padding: "10px" }}>no Task...</p>}

            <div className={falsytruthy && style.dontShow}>
                {taskFilter && taskFilter.map((task, index) =>
                    <div key={task.id} className={style.task}>
                        <div>
                            <span>{index + 1}</span>
                            <span className={task.status ? style.complete : ''}>{task.title}</span>
                        </div>
                    </div>)
                }
            </div>
            {toDo && falsytruthy && toDo.map((task, index) =>
                <div key={task.id} className={style.task}>
                    <div>
                        <span>{index + 1}</span>
                        <span className={task.status ? style.complete : ''}>{task.title}</span>
                    </div>
                    <div>
                        <span onClick={() => deleteToDo(task.id)}>trash</span>
                        <span onClick={() => checkForUpdate(task.id)}>update</span>
                        <span onClick={() => markOn(task.id)}>markon</span>
                    </div>
                </div>
            )}

            <div className={style.options}>
                <div className={style.filters}>
                    <span name='completed' onClick={(e) => completed(e)}>Completed<span>{toDo.filter(task => task.status === true).length}</span></span>
                    <span name='uncompleted' onClick={(e) => uncompleted(e)}>UnCompleted<span>{toDo.filter(task => task.status === false).length}</span></span>
                    <span name='all' onClick={(e) => allTasks(e)}>All<span>{toDo.length}</span></span>
                </div>
            </div>
        </div>
    );
}

export default App;