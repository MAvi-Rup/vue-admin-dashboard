import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/registration',
			component: () => import('../views/FarmerRegistrationView.vue')
		},
		{
			path: '/transport-permit',
			component: () => import('../views/TransportPermitView.vue')
		},
		{
			path: '/loan',
			component: () => import('../views/LoanSanctionView.vue')
		},
		{
			path: '/all-farmers',
			component: () => import('../views/ViewFarmersView.vue')
		},
		
	],
})

export default router