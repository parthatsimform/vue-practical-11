import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next();
			} else {
				next("/login");
			}
		},
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/Login.vue"),
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next("/");
			} else {
				next();
			}
		},
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/Register.vue"),
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next("/");
			} else {
				next();
			}
		},
	},
	{
		path: "/details/:id",
		name: "details",
		component: () => import("../views/CarDetail.vue"),
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next();
			} else {
				next("/login");
			}
		},
	},
	{
		path: "/userlist",
		name: "userlist",
		component: () => import("../views/Users.vue"),
		beforeEnter: (to, from, next) => {
			if (window.localStorage.getItem("role") == "admin") {
				next();
			} else {
				alert("Only admins can see users list");
				next("/login");
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkExactActiveClass: "activeBtn",
});

export default router;
