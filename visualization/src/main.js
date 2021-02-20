// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import VueKinesis from "vue-kinesis";

// import mitt from 'mitt'

// const emitter = mitt()

const app = createApp(App)
app.use(VueKinesis)

// app.config.globalProperties.emitter = emitter

app.mount('#app')
