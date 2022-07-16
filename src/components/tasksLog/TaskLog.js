import { Link } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deepPurple, grey, lightBlue } from '@mui/material/colors';
import { useDispatch, useSelector} from 'react-redux';

import {setTusks} from '../../actions/index';

import './taskLog.scss'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	
	[`&.${tableCellClasses.head}`]: {
	  color: grey[500],
	  fontSize: 20
	},
	[`&.${tableCellClasses.body}`]: {
		color: deepPurple[900],
		fontSize: 20
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(n)': {
	  backgroundColor: lightBlue[100],
	},
}));

function createData(id, task, timeStart, timeEnd, timeSpend, info, remove) {
    return { id, task, timeStart, timeEnd, timeSpend, info, remove};
}

const TaskLog = () => {
	const {tasks} = useSelector(state => state);
	const dispatch = useDispatch();
	const tasksLogTable = JSON.parse(localStorage.getItem('tasksLog'));

	const onDeleteLog = (id) => {
		tasksLogTable.forEach((item, i) => {
			if (item.id === id) {
				tasksLogTable.splice(i,1);
			}
		})
		localStorage.setItem('tasksLog', JSON.stringify(tasksLogTable));
		dispatch(setTusks(JSON.parse(localStorage.getItem('tasksLog'))));
	}

	const countTasks = () => {
		let rows = [];

		for(let i = 0; i < tasks.length; i++) {
			rows.push(createData(tasks[i].id, tasks[i].name, tasks[i].start, tasks[i].end, tasks[i].spend, 'INFO', 'DELETE'));
		}
		return rows;
	}

	const rows = countTasks();
	
	return(
		<>
			<hr className="line-log" />
			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center">№</StyledTableCell>
							<StyledTableCell align="center">Task</StyledTableCell>
							<StyledTableCell align="center">Time start</StyledTableCell>
							<StyledTableCell align="center">Time end</StyledTableCell>
							<StyledTableCell align="center">Time spend</StyledTableCell>
							<StyledTableCell align="center" >Info</StyledTableCell>
							<StyledTableCell align="center">Delete</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, i) => (
							<StyledTableRow
								key={row.id}
								sx={{'&:last-child td,&:last-child th': {border: 0}}}>
								<StyledTableCell align="center" component="th" scope="row" color='palette.secondary.dark'>
									{i + 1}
								</StyledTableCell>
								<StyledTableCell align="center">{row.task}</StyledTableCell>
								<StyledTableCell align="center">{row.timeStart}</StyledTableCell>
								<StyledTableCell align="center">{row.timeEnd}</StyledTableCell>
								<StyledTableCell align="center">{row.timeSpend}</StyledTableCell>
								<StyledTableCell align="center" ><Link to={`/${row.id}`}><button>{row.info}</button></Link></StyledTableCell>
								<StyledTableCell align="center" onClick={() => onDeleteLog(row.id)}><button>{row.remove}</button></StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default TaskLog;