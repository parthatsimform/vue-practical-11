<template>
    <div class="carPopup">
        <div class="carData">
            <div class="formHeader">
                <div class="formTitle">
                    <h2>{{ $t(carStore.title) }}</h2>
                </div>
                <div class="closePopup" @click="closePopup">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>

            <hr />
            <form class="carForm" @submit.prevent="addOrEditCarData">
                <label for="carName">Car Name*</label>
                <input id="carName" v-model="carStore.car.name" @input="validation.validateCarName(carNameInput)"
                    ref="carNameInput" />
                <div class="carNameError"></div>
                <label for="carImage">Car Image*</label>
                <input id="carImage" v-model="carStore.car.image" @input="validation.validateImage(imageInput)"
                    ref="imageInput" />
                <div class="imageError"></div>
                <label for="cardetails">Details*</label>
                <textarea id="cardetails" cols="30" rows="4" v-model="carStore.car.details"
                    @change="validation.validateDetails(detailsInput)" ref="detailsInput" />
                <div class="detailsError"></div>
                <label for="carPrice">Car Price(₹)*</label>
                <input id="carPrice" v-model="carStore.car.price" @input="validation.validatePrice(priceInput)"
                    ref="priceInput" />
                <div class="priceError"></div>
                <button type="submit" id="submitForm">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCarStore } from '../stores/car'
import useServices from '../composables/services.js'
import useValidations from '../composables/useValidations'

const validation = useValidations()
const service = useServices()
const carStore = useCarStore()

let carNameInput = ref(null)
let imageInput = ref(null)
let detailsInput = ref(null)
let priceInput = ref(null)

if (carStore.title == "editcar") {
    carStore.car.id = carStore.editableCar.id
    carStore.car.name = carStore.editableCar.name
    carStore.car.image = carStore.editableCar.image
    carStore.car.details = carStore.editableCar.details
    carStore.car.price = carStore.editableCar.price
}

const closePopup = () => {
    carStore.togglePopup = false;
    carStore.car.name = ""
    carStore.car.image = ""
    carStore.car.details = ""
    carStore.car.price = ""
}

const addOrEditCarData = () => {
    if (validation.validateCarName(carNameInput.value) &&
        validation.validateImage(imageInput.value) &&
        validation.validateDetails(detailsInput.value) &&
        validation.validatePrice(priceInput.value)
    ) {
        const car = {
            name: carStore.car.name,
            image: carStore.car.image,
            details: carStore.car.details,
            price: carStore.car.price,
        }
        if (carStore.title == "caradd") {
            service.newCarData(car);
            closePopup()
        }
        if (carStore.title == "editcar") {
            car.id = carStore.car.id;
            service.changeCarData(car);
            closePopup()
        }
    } else {
        validation.validateCarName(carNameInput.value)
        validation.validateImage(imageInput.value)
        validation.validateDetails(detailsInput.value)
        validation.validatePrice(priceInput.value)
    }
}
</script>

<style scoped>
.carPopup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.carData {
    background-color: white;
    border: 1px solid green;
    border-radius: 10px;
    width: 85%;
    max-width: 500px;
    min-height: 600px;
    padding: 20px 30px;
}

.formHeader {
    display: flex;
}

.closePopup {
    cursor: pointer;
}

.formTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    color: #184b00;
}

hr {
    border: 1px solid rgb(221, 221, 221);
}

.carForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input,
textarea {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

textarea {
    padding: 7px;
    height: 82px;
}

/* remove aerrow from number input field */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.carNameError,
.imageError,
.detailsError,
.priceError {
    color: red;
}

#submitForm {
    background-color: #e8ffdd;
    border: 1px solid green;
    color: green;
    border-radius: 5px;
    outline: none;
    width: 100px;
    padding: 10px;
    margin: 10px auto;
    font-size: 16px;
    cursor: pointer;
}

#submitForm:hover {
    background-color: green;
    color: #e8ffdd;
}

::placeholder {
    color: red;
}
</style>