import { createApp } from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import loadImages from './plugins/loadImages'


createApp(App)
.use(router) // $route, $router
.use(store) // $store
.use(loadImages)
.mount('#app')