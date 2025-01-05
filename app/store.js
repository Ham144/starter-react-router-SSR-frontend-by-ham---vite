import { tasks } from "./constants/constants"
import { create } from "zustand"

export const useAuth = create((set) => ({
    userLevel: 1,
    getUserInfo: () => { }
}));

export const useTodo = create((set) => ({
    tasks: tasks,
    ondragged: null,

    addTask: (newTask) => set((state) => state.tasks = [...state.tasks, {
        id: state.tasks.length + 1,
        title: newTask.title,
        state: newTask.state
    }]),
    removeTask: (titleTodelete) => set((state) => state.tasks = state.tasks.filter((task) => task.title !== titleTodelete)),
    setDragTask: (title) => set((state) => state.ondragged = title),
    dropTask: (tujuan) => set((state) => {
        console.log(state.ondragged, tujuan)
        const taskIdx = state.tasks.findIndex(task => task.title === state.ondragged)
        if (taskIdx > -1) {
            const newTasks = [...state.tasks]
            newTasks[taskIdx] = { ...state.tasks[taskIdx], state: tujuan }
            return { tasks: newTasks }
        }
        return state
    }),
})) 