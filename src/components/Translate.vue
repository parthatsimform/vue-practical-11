<template>
    <div class="language" :class="{ fadeBG: carStore.togglePopup }">
        <form>
            <select v-model="$i18n.locale" class="langSelect">
                <option value="en">en</option>
                <option value="fr">fr</option>
                <option value="gu">gu</option>
                <option value="hi">hi</option>
            </select>
        </form>
    </div>
</template>

<script setup>
import { useCarStore } from '../stores/car'
const carStore = useCarStore()
</script>

<style scoped>
.language {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

.langSelect {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 5px;
    background-color: green;
    border: 1px solid white;
    color: white;
    font-size: 16px;
    transition: all 0.2s linear;
}

.langSelect:hover {
    background-color: white;
    border: 1px solid green;
    color: black;
    border-radius: 0;
    width: 100px;
    height: 40px;
    transition: all 0.2s linear;
}
</style>