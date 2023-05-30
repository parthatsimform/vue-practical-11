import { useUserStore } from "../stores/user";
import { useCarStore } from "../stores/car";
import showError from "./useShowError";
import removeError from "./useRemoveError";

export default () => {
	const validateName = (ref) => {
		const userStore = useUserStore();
		if (userStore.user.name === "") {
			showError(ref, "nameError", "User name is required");
			return false;
		} else {
			removeError(ref, "nameError");
			return true;
		}
	};

	const validateEmail = (ref) => {
		const userStore = useUserStore();
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (emailRegex.test(userStore.user.email)) {
			removeError(ref, "emailError");
			return true;
		} else {
			showError(ref, "emailError", "Valid Email ID is required");
			return false;
		}
	};

	const validatePassword = (ref) => {
		const userStore = useUserStore();
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
		if (passwordRegex.test(userStore.user.password)) {
			removeError(ref, "passwordError");
			return true;
		} else {
			showError(
				ref,
				"passwordError",
				"Password of length 8-12 is required and must contain at least one numeric digit and a special character"
			);
			return false;
		}
	};

	const validateCPassword = (ref) => {
		const userStore = useUserStore();
		if (
			userStore.user.cPassword == "" ||
			userStore.user.cPassword !== userStore.user.password
		) {
			showError(
				ref,
				"cPasswordError",
				"Confirm password doesn't match with password"
			);
			return false;
		} else {
			removeError(ref, "cPasswordError");
			return true;
		}
	};

	const validateRole = (ref) => {
		const userStore = useUserStore();
		if (userStore.user.role === "") {
			showError(ref, "roleError", "Please select a role");
			return false;
		} else {
			removeError(ref, "roleError");
			return true;
		}
	};

	const validateGender = (ref) => {
		const userStore = useUserStore();
		if (userStore.user.gender === "") {
			showError(ref, "genderError", "Please select a gender");
			return false;
		} else {
			removeError(ref, "genderError");
			return true;
		}
	};

	const validateAge = (ref) => {
		const userStore = useUserStore();
		if (
			userStore.user.age !== "" &&
			Number.isInteger(Number(userStore.user.age))
		) {
			removeError(ref, "ageError");
			return true;
		} else {
			showError(ref, "ageError", "Age must be in integer required");
			return false;
		}
	};

	const validDOB = (dob) => {
		const givenDate = new Date(dob);
		const currDate = new Date();
		if (givenDate.getFullYear() >= 1900 && givenDate < currDate) {
			return true;
		}
		return false;
	};

	const validateDOB = (ref) => {
		const userStore = useUserStore();
		if (userStore.user.dob === "") {
			showError(ref, "dobError", "Please select your DOB");
			return false;
		} else if (!validDOB(userStore.user.dob)) {
			showError(
				ref,
				"dobError",
				"Please select valid DOB having year >=1900"
			);
		} else {
			removeError(ref, "dobError");
			return true;
		}
	};

	const validateCarName = (ref) => {
		const carStore = useCarStore();
		if (carStore.car.name == "") {
			showError(ref, "carNameError", "Car name is required");
			return false;
		} else {
			removeError(ref, "carNameError");
			return true;
		}
	};

	const urlChacker = (url) => {
		const urlPattern =
			/^((https?:)?\/\/)?[^\s]+\.(jpe?g|png|gif|bmp|webp)(\?\S*)?$/i;
		return urlPattern.test(url);
	};
	const validateImage = (ref) => {
		const carStore = useCarStore();
		if (!urlChacker(carStore.car.image)) {
			showError(ref, "imageError", "Please enter a valid image URL");
			return false;
		} else {
			removeError(ref, "imageError");
			return true;
		}
	};

	const validateDetails = (ref) => {
		const carStore = useCarStore();
		if (
			carStore.car.details === "" ||
			carStore.car.details.length < 30 ||
			carStore.car.details.length > 120
		) {
			showError(
				ref,
				"detailsError",
				"Car detail in limit of 30 to 120 characters is required"
			);
			return false;
		} else {
			removeError(ref, "detailsError");
			return true;
		}
	};

	const validatePrice = (ref) => {
		const carStore = useCarStore();
		if (
			carStore.car.price !== "" &&
			Number.isInteger(Number(carStore.car.price))
		) {
			removeError(ref, "priceError");
			return true;
		} else {
			showError(ref, "priceError", "Car Price in integer is required");
			return false;
		}
	};

	return {
		validateName,
		validateEmail,
		validatePassword,
		validateCPassword,
		validateRole,
		validateGender,
		validateAge,
		validateDOB,
		validateCarName,
		validateImage,
		validateDetails,
		validatePrice,
	};
};
