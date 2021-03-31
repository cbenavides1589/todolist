import React, { useState, useEffect } from "react";

export const TodoList = props => {
	const [tasks, setTasks] = useState([]);
	const [initialValue, setInitialValue] = useState(null);
	const [counter, setCounter] = useState(tasks.length + 1);

	const removeTodo = index => {
		const newTodos = [...tasks];
		newTodos.splice(index, 1);
		setTasks(newTodos);
		setCounter(counter - 1);
	};
	// Incluir neva tarea
	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, { label: newTask, done: false }]);
				myInput.value = "";
				setCounter(counter + 1);
			}
		}
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/amadriz", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(respAsJson => {
				respAsJson.map(task => {
					setTasks(tasks => [...tasks, task]);
				});
				console.log(respAsJson);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/amadriz", {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(respAsJson => {
				return respAsJson.json();
			})
			.catch(error => {
				console.log(error);
			});
	}, [tasks]);

	return (
		<div className="containerTodo">
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					value={initialValue}
					onKeyPress={() => {
						newTask(event);
					}}
					removeTodo={removeTodo}
				/>
			</form>
			<ul>
				{tasks.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<button
								className="remove"
								onClick={() => removeTodo(index)}>
								✔
							</button>
						</li>
					);
				})}
			</ul>
			<div className="footer">
				<p>Pending: {counter}</p>
			</div>
		</div>
	);
};
