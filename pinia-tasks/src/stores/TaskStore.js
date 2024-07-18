import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
        loading: false,
        name: "Pinia Tasks",
    }),
    getters: {
        favs() {
            return this.tasks.filter((task) => task.completed);
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.completed ? p + 1 : p;
            }, 0)
        },
        // demostration arrow function here (this in an arrow function does not refer to the this in the state)
        totalCount: (state) => {
            return state.tasks.length;
        }
    },
    actions: {
        // simulate fetching data from an API
        async fetchTasks() {
            this.loading = true;
            if (localStorage.getItem("tasks") === null) {
                const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
                const data = await res.json();
                this.tasks = data
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            } else {
                this.tasks = JSON.parse(localStorage.getItem("tasks"));
            }
            this.loading = false;
        },
        async addTask(task) {
            this.tasks.unshift(task);

            localStorage.setItem("tasks", JSON.stringify(this.tasks));

            const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json",
                }
            });
            if (res.error) {
                console.log(res.error);
            }
        },
        async toggleFave(id) {
            const task = this.tasks.find((task) => task.id === id);
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));

            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: task.completed
                }),
                headers: {
                    "Content-type": "application/json",
                }
            });

            if (res.error) {
                console.log(res.error);
            }
        },
        async removeTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE"
            }
            )
        }
    }
})