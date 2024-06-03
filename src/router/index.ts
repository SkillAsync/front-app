import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Inicio'
      },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Iniciar sesión'
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/registro',
      name: 'register',
      meta: {
        title: 'Registro'
      },
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/freelancers',
      name: 'freelancers',
      meta: {
        title: 'Freelancers'
      },
      component: () => import('@/views/FreelancersView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      meta:{
        title: 'Perfil'
      },
      component: ()=>import ('@/views/perfilUsuario.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        title: 'Acerca de nosotros'
      },
      component: () => import('@/views/infoSkillAsync.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})



export default router
