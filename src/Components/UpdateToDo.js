import React from 'react';

function UpdateToDo({style,cancelUpdate,handleChange,toDoCheckUpdate,updateToDo}) {
    return (
        <span className={style.updateToDoForm}>
            <button onClick={() => cancelUpdate()}>Cancel</button>
            <input type='text' name='updateToDoInput' onChange={(e) => handleChange(e)} value={toDoCheckUpdate.title} />
            <button onClick={() => updateToDo(toDoCheckUpdate.id)}>Update</button>
        </span>
    );
}

export default UpdateToDo;