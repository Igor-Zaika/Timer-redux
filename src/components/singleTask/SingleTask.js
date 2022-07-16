import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams  } from "react-router-dom"

import Page404 from '../pages/404'
import { setTusks } from '../../actions/index'
import './singleTask.scss';

const SingleTask = () => {
    const { tasks } = useSelector(state => state);
    const dispatch = useDispatch();
    const taskId = useParams()

    useEffect(() => {
        const tasksLog = JSON.parse(localStorage.getItem("tasksLog")); 
        dispatch(setTusks(tasksLog))
		// eslint-disable-next-line
	}, [])
    
    const singleTask = tasks.filter(item => item.id === taskId.taskId);

    const View = () => {
        return (
            <>
                <div className="single-log">
                    <div className="single-log__info">
                        <div className="task">Task:  {singleTask[0].name}</div>
                        <div className="time-start">Time start:  {singleTask[0].start}</div>
                        <div className="time-end">Time end:  {singleTask[0].end}</div>
                        <div className="time-spend">Time spend:  {singleTask[0].spend}</div>
                    </div>
                    <Link to="/" className="single-log__back">Back to main page</Link>
                </div>
            </>
        )
    }

    return(
        <>
            {singleTask.length > 0 ? <View/> : <Page404/>}
        </>
    )
}

export default SingleTask;