import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SetView from '@/views/SetView.vue'
import SearchCardView from '@/views/SearchCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/set',
      name: 'set',
      component: SetView
    },
    {
      path: '/search-card',
      name: 'search a card',
      component: SearchCardView
    }
  ]
})

export default router
