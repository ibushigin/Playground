import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CardsView from '@/views/CardsView.vue'
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
      path: '/cards',
      name: 'cards',
      component: CardsView
    },
    {
      path: '/search-card',
      name: 'search a card',
      component: SearchCardView
    }
  ]
})

export default router
