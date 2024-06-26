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
      path: '/freelancers',
      name: 'freelancers',
      meta: {
        title: 'Freelancers'
      },
      component: () => import('@/views/FreelancersView.vue')
    },
    {
      path: '/servicio/:uuid',
      name: 'servicio',
      meta: {
        title: 'Servicio'
      },
      component: () => import('@/views/servicioView.vue'),
      props: (route) => ({ uuid: route.params.uuid })
    },
    {
      path: '/perfil',
      name: 'perfil',
      meta: {
        title: 'Perfil',
        requiresAuth: true
      },
      component: () => import('@/views/perfilUsuario.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'Acerca de nosotros'
      },
      component: () => import('@/views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      meta: {        
        title: 'Chat',
        requiresAuth: true
      },
      component: () => import('@/views/ChatsView.vue'),
    }, 
    {
      path: '/chat/:uuid',
      name: 'chat-uuid',
      meta: {
        title: 'Chat',
        requiresAuth: true
      },
      component: () => import('@/views/ChatsUser.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {
        title: 'Contacto',
        requiresAuth: true
      },
      component: () => import('@/views/ContactView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string

  if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
    next({ name: 'home' })
    return
  } 
  next()
})



export default router
