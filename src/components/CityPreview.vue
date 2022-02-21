<template>
  <div class="city">
    <i
      v-if="edit"
      class="far fa-trash-alt edit"
      ref="edit"
      @click="deleteCity"
    ></i>
    <span>{{ props.city.city }}</span>
    <div class="weather">
      <span>{{ temperature }} &deg;C</span>
      <img :src="conditionImg" alt="" />
    </div>
    <div class="video">
      <video autoplay loop muted :src="conditionVideo"></video>
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { doc, deleteDoc } from "firebase/firestore";

import { database } from "../firebase/firebase.util";

const props = defineProps(["city", "edit"]);

const temperature = computed(() => {
  return `${Math.round(props.city.currentWeather.main.temp)}`;
});

const conditionImg = computed(() => {
  return require(`../../public/conditions/${props.city.currentWeather.weather[0].icon}.svg`);
});

const conditionVideo = computed(() => {
  return require(`../../public/videos/${props.city.currentWeather.weather[0].icon}.mp4`);
});

async function deleteCity() {
  return await deleteDoc(doc(database, "cities", props.city.id));
}
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .edit {
    border-radius: 0px 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 1;
    font-size: 16px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 24px;
    font-weight: 600;
  }

  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;

    span {
      font-size: 32px;
      margin-right: 8px;
    }

    img {
      height: 20px;
      width: auto;
    }
  }

  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    video {
      height: 100%;

      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }

    .bg-overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>