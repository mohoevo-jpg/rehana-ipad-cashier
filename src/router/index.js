import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/',
    component: () => import('../components/layout/AppSidebar.vue'),
    children: [
      {
        path: '',
        name: 'Cashier',
        component: () => import('../views/Cashier.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.guest && isAuthenticated) {
    next('/');
  } else if (!to.meta.guest && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;