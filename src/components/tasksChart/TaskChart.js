import { v4 as uuidv4 } from 'uuid';
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { useSelector, useDispatch } from "react-redux";
import { setTusks } from "../../actions";
import { getRandom } from '../../func';
import './taskChart.scss'; 


const TasksChart = () => {
	const { tasks } = useSelector(state => state);
	const dispatch = useDispatch();

	const data = []

	for (let i = 0; i < 24; i++) {
		data.push({ name: i, 'Minutes in this hours': 0})
	}

	tasks.forEach(task => {
		const dayOfToday = new Date().getDate();
		const day = +task.day

		const startHours = +task.start < 10 ? +task.start.slice(1, 2) : +task.start.slice(0, 2);
		const startMinutes = +task.start < 10 ? +task.start.slice(4, 5) : +task.start.slice(3, 5);
		const endHours = +task.end < 10 ? +task.end.slice(1, 2) : +task.end.slice(0, 2);
		const endMinutes = +task.end < 10 ? +task.end.slice(4, 5) : +task.end.slice(3, 5);

		if (dayOfToday > day) {
			return;
		} else if (dayOfToday === day) {
			for (let i = startHours; i <= endHours; i++) {
				if (startHours === endHours) {
					data[i]['Minutes in this hours'] = (endMinutes - startMinutes)
				} else if (i === startHours) {
					data[i]['Minutes in this hours'] = (60 - startMinutes);
				} else if (i === endHours) {
					data[i]['Minutes in this hours'] += endMinutes;
				} else {
					data[i]['Minutes in this hours'] =  + 60;
				}
			}
		}
	})

	const getGenerateTasks = () => {
		const randomNumberTasks = getRandom(10, 15)
		let startPoint = Date.now();
		const generatedTasks = [];

		for(let i = 0; i < randomNumberTasks; i++) {
			const timeBreaking = getRandom(60000,5400000)
			const durationOfTime = getRandom(600000,5400000);
			const generetedTime = startPoint + durationOfTime

			generatedTasks.push({day: new Date().getDate(), id: uuidv4(), name: 'lorem', start: startPoint, end: generetedTime})
			
			startPoint += durationOfTime + timeBreaking
		}
		localStorage.setItem('tasksLog', JSON.stringify(generatedTasks));
		dispatch(setTusks(generatedTasks));
	}

	return (
		<>
			<hr className="line-chart"/>
			<ResponsiveContainer height={450} width='100%'>
				<BarChart
					data={data}
					barSize={35}>
					<XAxis dataKey="name" scale="point" padding={{left: 40, right: 40 }} />
					<YAxis ticks={[0, 15, 30, 45, 60]} />
					<Tooltip />
					<Legend />
					<CartesianGrid strokeDasharray="3 3" />
					<Bar 
						dataKey="Minutes in this hours" 
						fill="#8884d8"/>
				</BarChart>
			</ResponsiveContainer>	
			<button 
				style={{backgroundColor: "red", color: "white", marginLeft: '80%'}}
				onClick={() => getGenerateTasks()}>GENERATE</button>
		</>
  	);
}

export default TasksChart;
