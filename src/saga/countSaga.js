import { put, call, take, fork, cancel, all } from 'redux-saga/effects';
import {startTimer, stopTimer, increaseTimer, setTusks } from '../actions/index'


const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* tick() {
    while (true) {
		yield call(delay, 100);
		yield put(increaseTimer());
	}
}

function* checkTasks() {
	const tasksLogTable = JSON.parse(localStorage.getItem('tasksLog'));
	try {
		if(tasksLogTable.length > 0) {
			yield put(setTusks(tasksLogTable))
			console.log('has tasks')
			
		}else {
			console.log('No tasks found');
		}
	}catch(e) {
		console.log('Failed to parse tasks', e);
	}
}

function* tickWatcher() {
    while (yield take('START_TIMER')) {
		yield put(startTimer());
		const timer = yield fork(tick);
  
    	const action = yield take('STOP_TIMER');
    	if (action.type === 'STOP_TIMER') {
        	yield put(stopTimer());
    	} 
    	yield cancel(timer);
    }
}

function* rootSaga() {
    yield all ([
		yield fork(tickWatcher),
		yield fork(checkTasks)
	]);
}

export default rootSaga;