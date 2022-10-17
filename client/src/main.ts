import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useEventsStore, usePlayerStore } from './stores'
import directives from '@/directives'
import uiComponents from '@/components/UI'

import '@/assets/scss/main.scss'

const app = createApp(App)
const store = createPinia()
uiComponents.forEach((component) => {
  app.component(component.name, component)
})
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})
app.use(store).use(router)
usePlayerStore().autoLogin()
useEventsStore()
  .loadPastRounds()
  .then(() => app.mount('#app'))
