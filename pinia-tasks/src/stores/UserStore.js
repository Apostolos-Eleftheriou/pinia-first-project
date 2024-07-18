import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: {},
        userLoading: false,
    }),
    actions: {
        async fetchUser() {
            let randomUser = Math.ceil(Math.random() * 10);
            this.userLoading = true;

            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${randomUser}`);
            const data = await res.json();

            this.userData = data;
            this.userLoading = false;
        }
    }
})