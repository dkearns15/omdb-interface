import './assets/main.css'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.component('VueSlider', VueSlider)

app.use(createPinia())

app.mount('#app')
