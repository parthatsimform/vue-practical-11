import { describe, expect, test } from "vitest";
import GalleryCard from "@/components/GalleryCard.vue";
import { useCarStore } from "../../stores/car";
import { createPinia } from "pinia";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

describe("GalleryCard.vue", () => {
	test("renders card content", async () => {
		const carStore = useCarStore(createPinia());
		const car = {
			name: "testname",
			image: "testimg",
			detail: "testdetail",
			price: "testprice",
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
		expect(component.text()).toContain(
			car.name,
			car.image,
			car.detail,
			car.price
		);
	});
});
