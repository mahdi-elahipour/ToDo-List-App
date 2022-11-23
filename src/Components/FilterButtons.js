const FiltersButton = ({ style, toDo, completed, uncompleted, allTasks }) => {

    return (
        <>
            <div className={style.options}>
                <div className={style.filters}>
                    <span
                        onClick={(e) => completed(e)}>Completed
                        <span>
                            {toDo.filter(task => task.status === true).length}
                        </span>
                    </span>
                    <span
                        onClick={ (e)=>uncompleted(e)}>UnCompleted
                        <span>
                            {toDo.filter(task => task.status === false).length}
                        </span>
                    </span>
                    <span
                        onClick={(e) => allTasks(e)}>All
                        <span>{toDo.length}</span></span>
                </div>
            </div></>
    )
}

export default FiltersButton;