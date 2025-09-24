import { createRouter, createWebHistory } from "vue-router";
import IntroView from "../views/IntroView.vue";
import HomeView from "../views/HomeView.vue";
import StoriaView from "../views/StoriaView.vue";
import MacchineView from "../views/MacchineView.vue";
import GalleryView from "../views/GalleryView.vue";
import FormView from "../views/FormView.vue";
import ProfileView from "../views/ProfileView.vue";
import ArmiView from "../views/ArmiView.vue";

const routes = [
  {
    path: "/",
    name: "intro",
    component: IntroView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/storia",
    name: "storia",
    component: StoriaView,
  },
  {
    path: "/macchine",
    name: "macchine",
    component: MacchineView,
  },
  {
    path: "/gallery",
    name: "gallery",
    component: GalleryView,
  },
  {
    path: "/contatti",
    name: "contatti",
    component: FormView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/armi",
    name: "armi",
    component: ArmiView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
