import { describe, expect, test } from "vitest";
import Users from "@/views/Users.vue";
import { shallowMount } from "@vue/test-utils";
import { useUserStore } from "../../stores/user";
import Axios from "axios";
import { createPinia } from "pinia";

describe("Users.vue", () => {
	test("renders all users", async () => {
		const userStore = useUserStore(createPinia());
		const res = await Axios.get(import.meta.env.VITE_USER_URL);
		const allUsers = (userStore.all = await res.data.data);
		const component = shallowMount(Users);
		const users = component.findAll(".singleUser");
		expect(users).toHaveLength(allUsers.length);
	});
});
