import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ViewFarmersView from '../views/ViewFarmersView.vue'
import DetailFarmersView from '../views/DetailFarmersView.vue'
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
			component: ViewFarmersView,
		},
		{
			path: '/all-farmers/:id',
			component: DetailFarmersView,
		},
		{
			path: '/qrCode',
			component: () => import('../views/PrintQrCodeView.vue')
		},
		
	],
})

export default router