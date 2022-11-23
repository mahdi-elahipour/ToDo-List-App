import React from 'react';

function TaskFilter({falsytruthy,style,taskFilter}) {
    return (
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
    );
}

export default TaskFilter;