<template>
    <div>
        <Transition name="form" mode="out-in">
            <CarDataForm v-if="carStore.togglePopup" />
        </Transition>
        <div id="homeComponent" :class="{ fadeBG: carStore.togglePopup }">
            <div id="addCar">
                <button class="addCarBtn" @click.prevent.stop="carStore.showCarForm">+ {{ $t('caradd') }}</button>
            </div>
            <div id="carComponent">
                <div v-if="carStore.cars == ''" class="loaderContainer">
                    <div class="loader"></div>
                </div>
                <TransitionGroup v-else name="carCard" appear>
                    <div v-for="car in carStore.loadAllCars" :key="car.id">
                        <GalleryCard :car="car" />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import GalleryCard from '../components/GalleryCard.vue';
import CarDataForm from '../components/CarDataForm.vue';
import useServices from '../composables/services'
import { useCarStore } from '../stores/car'

const carStore = useCarStore()
const service = useServices()

service.getCars()
</script>

<style scoped>
/* Car Form transition */
.form-enter-from,
.form-leave-to {
    opacity: 0;
    transform: scale(0.2);
}

.form-enter-active,
.form-leave-active {
    transition: all 0.5s ease;
}

.form-leave-active {
    position: absolute;
}

/* Car Card Transition */
.carCard-enter-from,
.carCard-leave-to {
    opacity: 0;
    transform: translateX(-200px) scale(0.2);
}

.carCard-enter-active,
.carCard-leave-active {
    transition: all 0.6s ease-in;
}

.carCard-leave-active {
    position: absolute;
}

.carCard-move {
    transition: all 0.3s ease;
}

#homeComponent {
    padding: 10px 8%;
}

#addCar {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto 10px;
}

.addCarBtn {
    padding: 7px 20px;
    background-color: #e8ffdd;
    color: green;
    border: 1px solid green;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.addCarBtn:hover {
    color: #e8ffdd;
    background-color: green;
}

#carComponent {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 1%;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
}

#carComponent>div {
    display: flex;
    justify-content: center;
}

.fadeBG {
    filter: contrast(40%);
    pointer-events: none;
}

@media (max-width:1350px) {
    #carComponent {
        grid-template-columns: auto auto auto;
    }
}

@media (max-width:1050px) {
    #carComponent {
        grid-template-columns: auto auto;
    }
}

@media(max-width:570px) {
    #carComponent {
        grid-template-columns: auto;
    }
}
</style>