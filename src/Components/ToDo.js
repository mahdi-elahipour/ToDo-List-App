import React, { useContext } from 'react';
import { UpdateContext } from '../App';
function ToDo(props) {
    const { deleteTask, willUpdateTask, markTask, trashIcon, updateIcon, markIcon } = useContext(UpdateContext);

    return (
        <div className={props.style.task}>
            <div>
                <span>{props.taskindex}</span>
                <span className={props.task.status ? props.style.complete : ''}>{props.task.title}</span>
            </div>
            <div>
                <span onClick={() => deleteTask(props.task.id)}>
                    <img src={trashIcon} width='22px' alt='trash' />
                </span>
                <span onClick={() => willUpdateTask(props.taskindex)}>
                    <img src={updateIcon} width='22px' alt='update' />
                </span>
                <span onClick={() => markTask(props.task.id)}>
                    <img src={markIcon} width='22px' alt='mark' />
                </span>
            </div>
        </div>
    );
}

export default ToDo;