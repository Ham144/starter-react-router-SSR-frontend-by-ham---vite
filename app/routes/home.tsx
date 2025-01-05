import { Welcome } from "~/components/welcome";
import type { Route } from "./+types/home";
import Board from "../components/Board";
import { useState } from "react";
import { useTodo } from "../store";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Home - Belajar Zustand & tanstack" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	//zustand
	const addTask = useTodo((state: any) => state.addTask);
	const removeTask = useTodo((state: any) => state.removeTask);
	const dropTask = useTodo((state: any) => state.dropTask);

	let tasksTodo = useTodo((state: any) => state.tasks);
	const [checkedType, setCheckedType] = useState<String>();

	const [newTask, setNewTask] = useState("");

	const handleTaksAdd = (e: any) => {
		e.preventDefault();
		addTask({
			title: newTask,
			state: checkedType,
		});
		console.log(newTask, checkedType);

		setNewTask("");
	};

	const handleDeleteTask = (title: String) => {
		console.log(title);
		try {
			removeTask(title);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDropFunc = (title: String, tujuan: String) => {
		dropTask(title, tujuan);
	};

	return (
		<div className="flex flex-col">
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<a>Parent</a>
								<ul className="p-2">
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
									</li>
								</ul>
							</li>
							<li>
								<a>Item 3</a>
							</li>
						</ul>
					</div>
					<a className="btn btn-ghost text-xl">daisyUI</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<a>Item 1</a>
						</li>
						<li tabIndex={0}>
							<details>
								<summary>Parent</summary>
								<ul className="p-2">
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<a>Item 3</a>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<a className="btn">Button</a>
				</div>
			</div>

			<div className="flex gap-x-3 items-center flex-col">
				<form onSubmit={handleTaksAdd}>
					<input
						type="text"
						placeholder="Tugas Baru"
						className="input input-bordered w-full max-w-xs"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<p>Plan</p>
					<input
						type="radio"
						name="type"
						className="radio radio-accent"
						value={"plan"}
						onChange={(e) => setCheckedType(e.target.value)}
					/>
					<p>ongoing</p>
					<input
						type="radio"
						name="type"
						className="radio radio-accent"
						value={"ongoing"}
						onChange={(e) => setCheckedType(e.target.value)}
					/>
					<p>completed</p>
					<input
						type="radio"
						name="type"
						className="radio radio-accent"
						value={"completed"}
						onChange={(e) => setCheckedType(e.target.value)}
					/>
					<button className="btn w-full mt-2" type="submit">
						Submit
					</button>
				</form>
				<div className=" min-h-screen bg-ase-200 max-md:flex-col gap-y-2 gap-x-5 flex mx-auto self-center w-full  justify-center pt-20 ">
					<Board
						importTasks={tasksTodo}
						state="plan"
						deleteFunc={handleDeleteTask}
						dropFunc={handleDropFunc}
					/>
					<Board
						importTasks={tasksTodo}
						state="ongoing"
						deleteFunc={handleDeleteTask}
						dropFunc={handleDropFunc}
					/>
					<Board
						importTasks={tasksTodo}
						state="completed"
						deleteFunc={handleDeleteTask}
						dropFunc={handleDropFunc}
					/>
				</div>
			</div>
		</div>
	);
}
