import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueKinesis from "vue-kinesis";

// Imports

createApp(App).use(store).use(router).use(VueKinesis).mount('#app')
