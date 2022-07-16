import { calcTime } from "../func"

const initialState = {
    nameTask: '',
    modal: false,
    time: Math.floor(Date.now() - localStorage.getItem('timerStart')),
    timerActive: false,
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_TIMER':
            return {
                ...state,
                timerActive: true,
            }
        case 'STOP_TIMER':
            return {
                ...state,
                timerActive: false,
                time: 0,
                
            } 
        case 'INCREASE_TIMER':
            return {
                ...state,
                timerActive: true,
                time: Math.floor(Date.now() - +localStorage.getItem('timerStart'))
            }
        case 'ON_ACTIVE_MODAL':
            return {
                ...state,
                modal: true
            }
        case 'OFF_ACTIVE_MODAL':
            return {
                ...state,
                modal: false
            }
        case 'ADD_NAME_TASK':
            return {
                ...state,
                nameTask: action.payload
            };
        case 'CLEAR_NAME':
            return {
                ...state,
                nameTask: ''
            };    
        case 'SET_TASKS':
            const newTasks = action.payload.map(task => {
                return {
                    day: task.day,
                    id: task.id,
                    name: task.name,
                    start: calcTime(task.start),
                    end: calcTime(task.end),
                    spend: calcTime(task.end - task.start),
                }
            })
            return {
                ...state,
                tasks: newTasks
            };
        default: return state
    }
}

export default reducer;
