import { describe, expect, test } from "vitest";
import CarDetail from "../../views/CarDetail.vue";
import Axios from "axios";
import { useCarStore } from "../../stores/car";
import { createPinia } from "pinia";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";

describe("CarDetail.vue", () => {
	test("renders correct car data", async () => {
		const carStore = useCarStore(createPinia());
		const res = await Axios.get(
			`${import.meta.env.VITE_CAR_URL}/${localStorage.getItem("carID")}`
		);
		const carData = (carStore.car = await res.data);
		const component = shallowMount(CarDetail, {
			global: {
				mocks: {
					$t: (message) => message,
				},
				components: {
					RouterLink: RouterLinkStub,
				},
			},
		});
		expect(component.find(".carName").text()).toBe(carData.name);
		expect(component.find(".imgSelector").attributes().src).toEqual(
			carData.image
		);
		expect(component.find(".carDesc").text()).toBe(carData.details);
		expect(component.find(".carPrice").text()).toContain(carData.price);
	});
});
