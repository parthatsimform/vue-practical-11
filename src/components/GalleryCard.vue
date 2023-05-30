<template>
    <div class="card">
        <div class="cardHeader">
            <Transition name="edit">
                <div class="editBtnDiv">
                    <button class="editBtn" @click.prevent.stop="carStore.editFormOpen(props.car)" title="Edit"><i
                            class="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </Transition>
            <div class="cardTitle">
                <h2>{{ props.car.name }}</h2>
            </div>
            <div class="deleteBtnDiv">
                <button class="deleteBtn" @click.prevent.stop="service.removeCar(props.car)" title="Delete"><i
                        class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
        <div class="cardImgDiv">
            <img :src="props.car.image" :alt="props.car.name" class="cardImg">
        </div>
        <div class="cardDsc">
            <p>{{ props.car.details }}</p>
        </div>

        <div class="info">
            <RouterLink :to="{ name: 'details', params: { id: `${car.id}` } }" class="infoBtn">
                {{ $t('info') }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useCarStore } from '../stores/car';
import useServices from '../composables/services.js'
const carStore = useCarStore()
const service = useServices()
const props = defineProps(["car"])
</script>

<style scoped>
.card {
    width: 300px;
    height: auto;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid rgb(221, 221, 221);
}

.card:hover {
    background-color: #e8ffdd;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid green;
}

.cardHeader {
    display: flex;
    margin: 0 0 10px;
    justify-content: space-between;
}

.cardTitle {
    font-family: 'Roboto', sans-serif;
    height: 75px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 2px;
    text-overflow: ellipsis;
}

.cardImg {
    width: 100%;
    height: 200px;
}

.cardDsc {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 5px;
    font-weight: 100;
    height: 112px;
    overflow: hidden;
}

.info {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.infoBtn {
    border: 1px solid green;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px 30px;
    width: 80%;
    background-color: green;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
    text-decoration: none;
}

.infoBtn:hover {
    color: #c7ffab;
    background-color: green;
}

.notAvailable {
    background-color: #ebffd8;
    color: black;
    cursor: not-allowed;
}

.notAvailable:hover {
    color: black;
    background-color: #ebffd8;
}

.editBtn,
.deleteBtn {
    padding: 10px;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: none;
}

.editBtn:hover,
.deleteBtn:hover {
    transform: scale(130%);
    transition: all 0.3s ease;
}

.card:active .editBtn {
    display: block;
}

.editBtn {
    border-bottom-right-radius: 10px;
    background-color: orange;
}

.deleteBtn {
    background-color: red;
    border-bottom-left-radius: 10px;
}

.card:hover .editBtn,
.card:hover .deleteBtn {
    display: block;
}

.editBtn:hover,
.deleteBtn:hover {
    filter: drop-shadow(0 0 0.1rem crimson);
}



@media(max-width:761px) {
    .card {
        width: 260px;
    }

    .cardImg {
        height: 190px;
    }

    .info {
        width: 95%;
        margin: 0 auto;
    }
}

@media(max-width:666px) {
    .cardImg {
        height: 210px;
    }

    .info {
        width: 100%;
    }
}

@media(max-width:570px) {
    .card {
        width: 300px;
    }

    .info {
        width: 100%;
    }
}

@media(max-width:303px) {
    .card {
        width: 290px;
    }
}
</style>