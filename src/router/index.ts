import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/projects', name: 'projects', component: () => import('../views/Projects.vue') },
    { path: '/projects/:slug', name: 'project-details', component: () => import('../views/ProjectDetails.vue') },
    { path: '/experience', name: 'experience', component: () => import('../views/Experience.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
  ],
})

export default router