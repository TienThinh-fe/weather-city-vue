import { createRouter, createWebHistory } from "vue-router";

import AddCity from "../views/AddCity.vue";

const routes = [{ path: "/", component: AddCity, props: true }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
