import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import GalleryCard from "../GalleryCard.vue";
import { useCarStore } from "../../stores/car";
import { createPinia } from "pinia";

describe("GalleryCard.vue", () => {
	test("renders router link", () => {
		const carStore = useCarStore(createPinia());
		const car = {
			id: "123",
		};
		const component = shallowMount(GalleryCard, {
			props: {
				car,
			},
			global: {
				components: {
					RouterLink: RouterLinkStub,
				},
				mocks: {
					$t: (message) => message,
				},
			},
		});
		console.log(component.html());
		expect(component.findComponent(RouterLinkStub).props().to).toEqual({
			name: "details",
			params: { id: `${car.id}` },
		});
	});
});
