import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Reports from '../views/Reports'

const routes = [
  {
    path: '/',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/upload',
    name: 'Upload Excel',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
