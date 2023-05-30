import { defineStore } from "pinia";

export const useCarStore = defineStore("car", {
	state: () => ({
		togglePopup: false,
		title: "",
		editableCar: {},
		cars: "",
		car: {
			name: "",
			image: "",
			details: "",
			price: "",
		},
		carID: null,
	}),
	getters: {
		loadAllCars() {
			return this.cars;
		},
		loadCar() {
			return this.car;
		},
	},
	actions: {
		editFormOpen(car) {
			this.togglePopup = true;
			this.title = "editcar";
			this.editableCar = car;
		},
		showCarForm() {
			this.togglePopup = true;
			this.title = "caradd";
		},
	},
});
