import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UpdateMaterielView from '@/views/UpdateMaterielView.vue';
import NewMaterielView from '@/views/NewMaterielView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: NewMaterielView
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateMaterielView
    }
  ]
});

export default router;
