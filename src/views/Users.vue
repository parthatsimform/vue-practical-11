<template>
    <div>
        <div class="heading">
            <h1>User List</h1>
        </div>
        <div v-if="userStore.all == ''" class="loaderContainer">
            <div class="loader"></div>
        </div>
        <v-container v-else class="userContainer">
            <v-table fixed-header height="70vh" class="userTable">
                <thead>
                    <tr>
                        <th class="text-center">
                            ID
                        </th>
                        <th class="text-center">
                            Name
                        </th>
                        <th class="text-center">
                            Email
                        </th>
                        <th class="text-center">
                            Password
                        </th>
                        <th class="text-center">
                            Gender
                        </th>
                        <th class="text-center">
                            Age
                        </th>
                        <th class="text-center">
                            DOB
                        </th>
                        <th class="text-center">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="singleUser" v-for="user in userStore.all" :key="user.id">
                        <td class="text-center">{{ user.id }}</td>
                        <td class="text-center">{{ user.name }}</td>
                        <td class="text-center">{{ user.email }}</td>
                        <td class="text-center">{{ user.password }}</td>
                        <td class="text-center">{{ user.gender }}</td>
                        <td class="text-center">{{ user.age }}</td>
                        <td class="text-center">{{ user.dob }}</td>
                        <td class="text-center">
                            <template v-if="user.role == 'admin'">
                                <v-chip class="ma-2" color="red" text-color="white">
                                    {{ user.role }}
                                </v-chip>
                            </template>
                            <template v-else>
                                {{ user.role }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </div>
</template>

<script setup>
import useServices from '../composables/services'
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
const service = useServices()
service.getAllUsers();
</script>

<style scoped>
@import "vuetify/styles";

.heading {
    text-align: center;
    font-size: 1.3rem;
    margin: 50px;
}

.heading>h1 {
    display: inline-flex;
    padding: 5px 10px;
    border-radius: 10px;
    border: 2px solid black;
}

.userContainer {
    width: 80%;
    margin: 0 auto;
}

.userTable {
    border-radius: 10px;
    border: 1px solid rgb(214, 214, 214);
}

.adminColor {
    background-color: rgb(255, 0, 0);
    color: white;
    padding: 2px 5px;
    border-radius: 5px;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
    font-weight: 700;
    color: black;
    background-color: rgb(91, 248, 91);
}

tbody>tr:nth-child(even) {
    background-color: rgb(235, 255, 235);
}
</style>