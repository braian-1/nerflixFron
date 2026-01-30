import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "@/views/LoginVue.vue";
import RegisterVue from "@/views/RegisterVue.vue";
import HomeUserView from "@/views/HomeUserView.vue";

const routes = [
  { path: "/", component: LoginVue },
  { path: "/register", component: RegisterVue },
  { path: "/home", component: HomeUserView }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
