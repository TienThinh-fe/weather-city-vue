<template>
  <div class="city-grid">
    <div
      class="city-preview"
      v-for="(city, index) in props.cities"
      :key="index"
    >
      <city-preview :city="city"></city-preview>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import CityPreview from "../components/CityPreview.vue";

const props = defineProps(["cities"]);
</script>

<style lang="scss" scoped>
.city-grid {
  display: grid;
  padding-top: 81px;
  background-color: #464c53;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>