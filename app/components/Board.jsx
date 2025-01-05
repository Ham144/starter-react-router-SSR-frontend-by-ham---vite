import React, { useEffect, useState } from "react";

const Board = ({ importTasks, state, deleteFunc, dropFunc }) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const filteredTasks = importTasks.filter((task) => {
			return task.state == state;
		});
		const latestTasksorder = filteredTasks.slice().reverse();
		setTasks(latestTasksorder);
	}, [importTasks]);

	const handleDrop = (state) => {
		dropTask({ tujuan: state });
	};

	const handleondragover = (e) => {
		e.preventDefault();
		console.log("dragover here");
	};

	const handleOnDragStart = (title) => {
		console.log("telah terdrag: ", title);
	};

	return (
		<div
			className="flex md:w-96 flex-col gap-y-2 border p-2 "
			onDrop={() => handleDrop(state)}
		>
			<h2 className="badge my-3">{state}</h2>
			{tasks.map((task) => {
				return (
					<div key={task.id}>
						<div
							draggable
							onDragStart={() => handleOnDragStart(task.title)}
							key={task.id}
							className="bg- gray-200 relative cursor-move border backdrop-blur-xl glass p-4 rounded-md"
						>
							<h1>{task.title}</h1>
							<p>{task.description}</p>
							<button
								onClick={() => deleteFunc(task.title)}
								className="btn absolute right-0 top-3 bg-red-300 self-center"
							>
								hapus
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Board;
