import { describe, expect, test } from "vitest";
import Home from "@/views/Home.vue";
import GalleryCard from "@/components/GalleryCard.vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { useCarStore } from "../../stores/car";
import Axios from "axios";

describe("Home.vue", () => {
	test("renders cards of cars", async () => {
		const carStore = useCarStore(createPinia());
		const res = await Axios.get(import.meta.env.VITE_CAR_URL);
		const cars = (carStore.cars = await res.data.data);
		const component = shallowMount(Home, {
			global: {
				mocks: {
					$t: (message) => message,
				},
			},
		});
		const carCards = component.findAllComponents(GalleryCard);
		expect(carCards).toHaveLength(cars.length);
		carCards.forEach((card, i) => {
			expect(card.props().car).toStrictEqual(cars[i]);
		});
	});
});
