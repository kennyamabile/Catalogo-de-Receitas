import { createRouter, createWebHistory } from 'vue-router'
import RecipesCrud from '../pages/RecipesCrud.vue'
import RecipesCards from '../pages/RecipesCards.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', redirect: { name: 'cards' } },
  { path: '/cards', name: 'cards', component: RecipesCards },
  { path: '/crud', name: 'crud', component: RecipesCrud },
  { path: '/about', name: 'about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
