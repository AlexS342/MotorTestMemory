import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue')
    },
    {
      path: '/replay',
      name: 'replay',
      component: () => import('../views/ReplayView.vue')
    }
  ]
})

export default router
