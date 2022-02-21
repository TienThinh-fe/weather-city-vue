<template>
  <div id="app">
    <modal
      v-if="modalOpen"
      @close-modal="toggleModal"
      :API_KEY="API_KEY"
    ></modal>
    <navigation @add-city="toggleModal" @edit-city="toggleEdit"></navigation>
    <router-view :cities="cities" :edit="edit"></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import { database } from "./firebase/firebase.util";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";

const API_KEY = ref(process.env.VUE_APP_WEATHER_API_KEY);
const cities = ref([]);
const modalOpen = ref(null);
const edit = ref(null);

function getCityWeather() {
  const q = query(collection(database, "cities"));

  onSnapshot(q, async (querySnapshot) => {
    console.log("GET DATA FROM FIREBASE");
    cities.value = [];
    console.log("CITIES 1: ", cities.value);
    try {
      cities.value = [];
      querySnapshot.forEach(async (document) => {
        console.log("CITIES 2: ", cities.value);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            document.data().city
          }&units=metric&appid=${API_KEY.value}`
        );

        const weather = response.data;

        await updateDoc(doc(database, "cities", document.id), {
          id: document.id,
          currentWeather: weather,
        });

        cities.value.push(document.data());
        console.log("CITIES 3: ", cities.value);
      });
    } catch (error) {
      console.error(error);
    }
  });
}

function toggleModal() {
  modalOpen.value = !modalOpen.value;
}

function toggleEdit() {
  edit.value = !edit.value;
}

getCityWeather();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

#app {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>