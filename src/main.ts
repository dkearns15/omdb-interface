import './assets/main.css'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.component('VueSlider', VueSlider)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')
