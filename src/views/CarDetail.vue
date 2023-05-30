<template>
    <div>
        <div class="backBtn">
            <RouterLink :to="{ name: 'home' }"><i class="fa-solid fa-caret-left"></i> Back</RouterLink>
        </div>
        <div v-if="carStore.car.name == ''" class="loaderContainer">
            <div class="loader"></div>
        </div>
        <div v-else>
            <div class="carDetail">
                <div class="carImg">
                    <img class="imgSelector" :src="carStore.loadCar.image" :alt="carStore.loadCar.name" />
                </div>
                <div class="carInfo">
                    <div class="carName">
                        <h2>{{ carStore.loadCar.name }}</h2>
                    </div>
                    <div class="carDesc">
                        <p>{{ carStore.loadCar.details }}</p>
                    </div>
                    <div class="carPrice">
                        <p>{{ $t('price') }}:&nbsp;<span>₹{{ carStore.loadCar.price }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCarStore } from '../stores/car';
import useServices from '../composables/services.js'
import { onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const carStore = useCarStore()
const service = useServices()

carStore.carID = route.params.id
service.getCar()

onBeforeUnmount(() => {
    carStore.car = {
        name: "",
        image: "",
        details: "",
        price: "",
    }
})
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

.backBtn {
    margin: 10px 9%;
    color: black;
    display: inline-flex;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;

}

.carDetail {
    display: flex;
    background-color: white;
    width: 90%;
    max-width: 1400px;
    margin: 20px auto;
    border-radius: 10px;
    border: 1px solid rgb(221, 221, 221);
}

.carImg {
    width: 50%;
}

.carImg img {
    width: 90%;
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.carInfo {
    padding: 5px;
}

.carName {
    font-size: 2rem;
    color: rgb(7, 15, 56);
}

.carDesc {
    font-size: 1rem;
}

.carPrice p {
    display: inline-flex;
    background-color: rgb(0, 90, 90);
    color: white;
    padding: 10px 15px;
    border-radius: 50px;
}

@media(max-width: 420px) {
    .carDetail {
        background: none;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border: 0px;
    }
}

@media(max-width:720px) {
    .carDetail {
        flex-direction: column;
    }

    .carImg {
        width: 100%;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
    }

    .carInfo {
        padding: 0 15px;
    }
}
</style>