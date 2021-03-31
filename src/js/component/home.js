import React from "react";

import { TodoList } from "./list";

//create your first component
export function Home() {
	return (
		<div className="container text-center">
			<h1>To-Do List</h1>
			<TodoList />
		</div>
	);
}
