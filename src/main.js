import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGoodTablePlugin from 'vue-good-table-next'; // Update import
import 'vue-good-table-next/dist/vue-good-table-next.css'; // Update CSS import
import './assets/base.css';



const app = createApp(App);

app.use(router);
app.use(VueGoodTablePlugin);

app.mount('#app');

