import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';



createApp(App).use(store).use(router).use(SimpleTypeahead).mount('#app')
