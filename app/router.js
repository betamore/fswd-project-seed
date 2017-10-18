import Vue from 'Vue';
import Hello from './Hello.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Hello
        },
        {
            path: '/users/register',
            component: Register
        },
        {
            path: '/users/login',
            component: Login
        }
    ]
});
