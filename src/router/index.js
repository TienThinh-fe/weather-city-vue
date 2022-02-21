import { createRouter, createWebHistory } from "vue-router";

import AddCity from "../views/AddCity.vue";
import CityWeather from "../views/CityWeather.vue";

const routes = [
  { path: "/", component: AddCity, props: true },
  { path: "/weather/:city", component: CityWeather, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
