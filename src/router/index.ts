import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Inicio',
      },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Iniciar sesión',
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/registro',
      name: 'register',
      meta: {
        title: 'Registro',
      },
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/publicaciones',
      name: 'publications',
      meta: {
        title: 'Publicaciones',
      },
      component: () => import('@/views/PublicationsView.vue')
    },
    {
      path: '/usuarios',
      name: 'users',
      meta: {
        title: 'Usuarios',
      },
      component: () => import('@/views/UsersView.vue')
    }
  ]
})



export default router
