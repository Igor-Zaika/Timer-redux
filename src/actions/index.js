export const startTimer = () => {
    return {
        type: 'START_TIMER',
    }
}

export const stopTimer = () => {
    return {
        type: 'STOP_TIMER'
    }
}

export const increaseTimer = () => {
    return {
        type: 'INCREASE_TIMER'
    }
}

export const onActiveModal = () => {
    return {
        type: 'ON_ACTIVE_MODAL'
    }
}

export const offActiveModal = () => {
    return {
        type: 'OFF_ACTIVE_MODAL'
    }
}

export const addNameTask = (name) => {
    return {
        type: 'ADD_NAME_TASK',
        payload: name
    }
}

export const clearName = () => {
    return {
        type: 'CLEAR_NAME',
    }
}

export const setTusks = (arr) => {
    return {
        type: 'SET_TASKS',
        payload: arr
    }
}

export const setGeneretedTasks = (tasks) => {
    return {
        type: 'SET_GENERETED_TASKS',
        payload: tasks
    }
}
