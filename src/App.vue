<template>
  <div id="app">
    <modal
      v-if="modalOpen"
      @close-modal="toggleModal"
      :API_KEY="API_KEY"
    ></modal>
    <navigation
      @add-city="toggleModal"
      @edit-city="toggleEdit"
      :addCityActive="addCityActive"
      :isDay="isDay"
      :isNight="isNight"
    ></navigation>
    <router-view
      :cities="cities"
      :edit="edit"
      :API_KEY="API_KEY"
      @is-day="dayTime"
      @is-night="nightTime"
      @reset-days="resetDays"
      :isDay="isDay"
      :isNight="isNight"
    ></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { collection, query, onSnapshot } from "firebase/firestore";

import { database } from "./firebase/firebase.util";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";

const API_KEY = ref(process.env.VUE_APP_WEATHER_API_KEY);
const cities = ref([]);
const modalOpen = ref(null);
const edit = ref(false);
const addCityActive = ref(null);
const isDay = ref(null);
const isNight = ref(null);

const route = useRoute();

function getCityWeather() {
  const q = query(collection(database, "cities"));
  return onSnapshot(q, (querySnapshot) => {
    const citiesFromFirebase = [];
    querySnapshot.forEach(async (document) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            document.data().city
          }&units=metric&appid=${API_KEY.value}`
        )
        .then((res) => res.data)
        .then((data) => {
          citiesFromFirebase.push({
            id: document.id,
            city: document.data().city,
            currentWeather: data,
          });
          cities.value = [...citiesFromFirebase];
        })
        .catch((err) => console.log(err));
    });
  });
}

function toggleModal() {
  modalOpen.value = !modalOpen.value;
}

function toggleEdit() {
  edit.value = !edit.value;
}

function checkRoute() {
  if (route.path === "/") {
    addCityActive.value = true;
  } else {
    addCityActive.value = false;
  }
}

function dayTime() {
  isDay.value = !isDay.value;
}

function nightTime() {
  isNight.value = !isNight.value;
}

function resetDays() {
  isDay.value = false;
  isNight.value = false;
}

watch(route, () => {
  checkRoute();
});

checkRoute();
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

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>