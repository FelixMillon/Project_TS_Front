import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store.js';
import ManageCookies from './modele/manageCookies.ts';
const app = createApp(App)
app.use(router)
app.use(store)


app.mount('#app')
//remplacer le stockage des username et password en cookies
// par le stockage d'un jwt

//creation d'un usertest
ManageCookies.createCookie("username", "admin@gmail.com", 1);
ManageCookies.createCookie("password", "Azerty@123", 2);