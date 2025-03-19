import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DashboardUser from '../components/DashboardUser.vue';
import DashboardAdm from '../components/DashboardAdm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/dashboard-user', component: DashboardUser},
  { path: '/dashboard-adm', component: DashboardAdm},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;