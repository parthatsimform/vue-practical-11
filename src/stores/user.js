import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: window.localStorage.getItem("isLoggedIn"),
		role: window.localStorage.getItem("role"),
		all: "",
		user: {
			name: "",
			email: "",
			password: "",
			cPassword: "",
			role: "",
			gender: "",
			age: "",
			dob: "",
		},
	}),
	actions: {
		logOut() {
			window.localStorage.removeItem("isLoggedIn");
			window.localStorage.removeItem("token");
			window.localStorage.removeItem("role");
			this.role = "";
			this.isLoggedIn = false;
		},
	},
});
