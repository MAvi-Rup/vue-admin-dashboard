<template>
	<div :key="rerenderKey" class="app">
	  <!-- Sidebar -->
	  <Sidebar v-if="isAuthenticated" />
  
	  <!-- Content -->
	  <router-view v-if="isAuthenticated" />
  
	  <!-- Authentication -->
	  <div>
		<authenticator :login-mechanisms="['email']">
		  <template v-slot="{ user }">
			<h1>Hello {{ user.username }}!</h1>
		  </template>
		</authenticator>
	  </div>
	</div>
  </template>
  
  <script setup>
	import { ref, onMounted, watch } from 'vue';
	import Sidebar from './components/Sidebar.vue';
	import { Amplify, Auth } from 'aws-amplify';
	import awsconfig from './aws-exports';
	import { Authenticator } from "@aws-amplify/ui-vue";
  
	const isAuthenticated = ref(false);
	const rerenderKey = ref(Date.now()); // Initial key
  
	const checkAuthentication = async () => {
	  try {
		await Auth.currentAuthenticatedUser();
		isAuthenticated.value = true;
	  } catch (error) {
		isAuthenticated.value = false;
	  }
	};
  
	onMounted(checkAuthentication);
  
	watch(isAuthenticated, (newValue) => {
	  if (newValue) {
		rerenderKey.value = Date.now(); // Update the key to trigger a re-render
	  }
	});
  </script>
  
  
  
  
  
  
  
  
  
<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>
  