import React from 'react';

function AddToDo(props) {
    return (
        <div>
            <span className={props.style}>
                <input type='text' name='addToDoInput' value={props.newtask.title} onChange={(e) => props.changeHandler(e)} />
                <button onClick={(e) => e.target.previousSibling.value ? props.addtodo(e) : e.target.previousSibling.classList.add(props.warningStyle)}>Add ToDo</button>
            </span>
        </div>
    );
}

export default AddToDo;