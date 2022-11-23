import React from 'react';
import ToDo from './ToDo';

function ToDos(props) {
    return (
        <>
            {props.todos.map((task, index) => {
                return <ToDo
                    key={task.id}
                    task={task}
                    style={props.style}
                    taskindex={index + 1}
                />
            })}
        </>
    );
}

export default ToDos;