<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div
      v-else
      class="weather"
      :class="{ day: props.isDay, night: props.isNight }"
    >
      <div class="weather-wrap">
        <CurrentWeather
          :isDay="isDay"
          :isNight="isNight"
          :currentWeather="currentWeather"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { collection, query, where, getDocs } from "firebase/firestore";

import { database } from "../firebase/firebase.util";

import CurrentWeather from "../components/CurrentWeather.vue";

const forecast = ref(null);
const currentWeather = ref(null);
const loading = ref(true);
const currentTime = ref(null);

const props = defineProps(["API_KEY", "isDay", "isNight"]);
const emit = defineEmits(["is-day", "is-night", "reset-days"]);

const route = useRoute();

function getWeather() {
  const q = query(
    collection(database, "cities"),
    where("city", "==", `${route.params.city}`)
  );

  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      currentWeather.value = doc.data().currentWeather;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${
            doc.data().currentWeather.coord.lat
          }&lon=${
            doc.data().currentWeather.coord.lon
          }&exclude=current,minutely,alerts&units=metric&appid=${props.API_KEY}`
        )
        .then((res) => {
          forecast.value = res.data;
        })
        .then(() => {
          loading.value = false;
          getCurrentTime();
        });
    });
  });
}

function getCurrentTime() {
  const dateObject = new Date();
  currentTime.value = dateObject.getHours();
  const sunrise = new Date(currentWeather.value.sys.sunrise * 1000).getHours();
  const sunset = new Date(currentWeather.value.sys.sunset * 1000).getHours();

  console.log();

  if (currentTime.value > sunrise && currentTime.value < sunset) {
    emit("is-day");
  } else {
    emit("is-night");
  }
}

getWeather();

onBeforeUnmount(() => {
  emit("reset-days");
});
</script>

<style lang="scss" scoped>
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .loading {
    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
      border: 2px solid transparent;
      border-top-color: #142a5f;
      border-radius: 50%;
      animation: spin ease 1000ms infinite;
    }
  }
  .weather {
    transition: 500ms ease;
    overflow: scroll;
    width: 100%;
    height: 100%;
    .weather-wrap {
      overflow: hidden;
      max-width: 1024px;
      margin: 0 auto;
    }
  }
}
</style>