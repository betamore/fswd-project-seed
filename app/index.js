import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
