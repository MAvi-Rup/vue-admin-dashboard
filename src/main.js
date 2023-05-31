import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Auth } from 'aws-amplify';
// import AmplifyVue from '@aws-amplify/ui-vue';
import awsconfig from './aws-exports';

import '@aws-amplify/ui-vue/styles.css';
window.global = window;

// const app = createApp(App);
// app.use(router);
// app.use(AmplifyVue);
// app.mount('#app');

// // Configure Amplify
// AmplifyVue.configure(awsconfig);
Auth.configure(awsconfig);
createApp(App).use(router).mount("#app");
