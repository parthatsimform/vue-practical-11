import Axios from "axios";
import { useCarStore } from "../stores/car";
import { useUserStore } from "../stores/user";
import router from "../router";

export default () => {
	const getCars = async () => {
		const carStore = useCarStore();
		const res = await Axios.get(import.meta.env.VITE_CAR_URL, {
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem("token")}`,
			},
		});
		const data = await res.data.data;
		carStore.cars = data;
	};

	const getCar = async () => {
		const carStore = useCarStore();
		try {
			const res = await Axios.get(
				`${import.meta.env.VITE_CAR_URL}/${carStore.carID}`,
				{
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			const data = await res.data;
			carStore.car = data;
		} catch (err) {
			alert(err);
		}
	};

	const newCarData = async (newCar) => {
		const carStore = useCarStore();
		try {
			const res = await Axios.post(import.meta.env.VITE_CAR_URL, newCar, {
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem(
						"token"
					)}`,
				},
			});
			if (res.status === 201) {
				getCars();
			}
		} catch (e) {
			alert(e);
		}
		carStore.togglePopup = false;
	};

	const changeCarData = async (car) => {
		const carStore = useCarStore();
		try {
			const res = await Axios.put(
				`${import.meta.env.VITE_CAR_URL}/${car.id}`,
				car,
				{
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			if (res.status === 200) {
				getCars();
			}
		} catch (e) {
			alert(e);
		}
		carStore.togglePopup = false;
	};

	const removeCar = async (car) => {
		try {
			if (confirm("Are you sure you want to delete " + car.name + "?")) {
				const res = await Axios.delete(
					`${import.meta.env.VITE_CAR_URL}/${car.id}`,
					{
						headers: {
							Authorization: `Bearer ${window.localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				if (res.status === 204) {
					getCars();
				}
			}
		} catch (e) {
			alert(e);
		}
	};

	const getAllUsers = async () => {
		const userStore = useUserStore();
		const res = await Axios.get(import.meta.env.VITE_USER_URL);
		const data = await res.data.data;
		userStore.all = await data;
	};

	const signupUser = async (newUser) => {
		const userStore = useUserStore();
		try {
			const res = await Axios.post(
				import.meta.env.VITE_USER_URL,
				newUser
			);
			if (res.status === 201) {
				userStore.isLoggedIn = true;
				userStore.role = user.role;
				window.localStorage.setItem("role", newUser.role);
				window.localStorage.setItem("isLoggedIn", true);
				window.localStorage.setItem("token", `ThisIsRandomKey`);
				router.push({ name: "home" });
			}
		} catch (err) {
			alert(err);
		}
	};

	const signinUser = async (email, password) => {
		const userStore = useUserStore();
		let allUsers;
		try {
			const res = await Axios.get(import.meta.env.VITE_USER_URL);
			const data = await res.data.data;
			allUsers = data;
			let user = allUsers.find(
				(u) => u.email == email && u.password == password
			);
			if (user) {
				userStore.isLoggedIn = true;
				userStore.role = user.role;
				window.localStorage.setItem("role", user.role);
				window.localStorage.setItem("isLoggedIn", true);
				window.localStorage.setItem("token", `ThisIsRandomKey`);
				router.push({ name: "home" });
			} else {
				alert("User not found");
			}
		} catch (err) {
			alert(err);
		}
	};

	return {
		getCars,
		getCar,
		newCarData,
		changeCarData,
		removeCar,
		signupUser,
		signinUser,
		getAllUsers,
	};
};
