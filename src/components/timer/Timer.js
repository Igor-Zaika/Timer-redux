import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { startTimer, stopTimer, addNameTask, onActiveModal, clearName, setTusks } from '../../actions/index';

import {calcTime} from '../../func'
import './timer.scss'

const Timer = () => {
    const { nameTask, time, timerActive } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!localStorage.getItem('timerStart')) {
            dispatch(stopTimer());
        } else {
            dispatch(startTimer());
        }
        // eslint-disable-next-line
    }, []);

    const getStartTimer = () => {
        if(!localStorage.getItem('timerStart'))  {
            localStorage.setItem('timerStart', Date.now())
            dispatch(startTimer());
        } else {
            dispatch(startTimer());
        }
    }
  
    const addNewTasks = () => {
        const startTime = +localStorage.getItem('timerStart');
        const  endTime = Date.now();

        let tasksLogTable = JSON.parse(localStorage.getItem("tasksLog"));
        if(tasksLogTable === null) tasksLogTable = [];

        const сreateNewTasksTable = () => {
            const newTask = {
                day: new Date().getDate(),
                id: uuidv4(),
                name: nameTask,
                start: startTime + 3 * 60 * 60 * 1000,
                end: endTime + 3 * 60 * 60 * 1000,
            }
            return newTask;
        }

        tasksLogTable.push(сreateNewTasksTable());
        localStorage.setItem("tasksLog", JSON.stringify(tasksLogTable));
        dispatch(setTusks(tasksLogTable));
    }

    
 
    const onStopTimer = () => {
        if(nameTask) {
            dispatch(stopTimer());
            addNewTasks();
            dispatch(clearName());
            localStorage.removeItem('timerStart');
        } else {
            dispatch(onActiveModal());
        }
    }

    return (
        <>
            <input 
                type='text' 
                placeholder="Name of your tusk" 
                value={nameTask}
                onChange={(e) => dispatch(addNameTask(e.target.value))}>
            </input>
            <div className="circle"></div>
            <div className="timer">
                {calcTime(time)}
            </div>
            {!timerActive ? <button className='button' onClick={() => getStartTimer()}>START</button> : ''}
            {timerActive ? <button className='button' onClick={() => onStopTimer()}>STOP</button> : ''}
        </>
    )
}

export default Timer;