<template>
  <div>
    <header v-if="props.addCityActive" class="container add-city">
      <nav>
        <span>Weather City</span>
        <div class="right">
          <i class="far fa-edit" @click="$emit('edit-city')"></i>
          <i class="fas fa-sync"></i>
          <i class="far fa-plus" @click="$emit('add-city')"></i>
        </div>
      </nav>
    </header>
    <header
      v-else
      class="container"
      :class="{ day: props.isDay, night: props.isNight }"
    >
      <nav>
        <router-link to="/" class="router-link">
          <i class="fa-solid fa-chevron-left"></i>
        </router-link>
        <span>
          {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleString("en-us", { month: "short" }) }}
          {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
        </span>
        <span>&deg; C</span>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["addCityActive", "isDay", "isNight"]);
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}

header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 30px 0;
    span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .right {
    i {
      font-size: 20px;
    }
    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
    i:nth-child(3) {
      font-weight: 600;
    }
  }
  .edit-active {
    color: rgba(210, 75, 75, 1);
  }
  .router-link {
    color: #fff;
  }
}
</style>