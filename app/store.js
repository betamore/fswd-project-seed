import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: true,
        authenticated: false,
        user: {
            username: 'rayners'
        }
    },
    mutations: {
        loaded(state) {
            state.loading = false;
        },
        loginSuccess(state) {
            state.authenticated = true;
        },
        logoutSuccess(state) {
            state.authenticated = false;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        checkLogin({ commit }) {
            axios.get('/users/current')
                .then(userResponse => {
                    commit('setUser', userResponse.data);
                    commit('loginSuccess');
                    commit('loaded');
                })
                .catch(() => {
                    commit('loaded');
                    // do something for unauthenticated?
                })
        },
        tryRegister({ commit }, userInfo) {
            axios.post('/users/register', userInfo)
                .then(response => {
                    commit('setUser', response.data);
                    commit('loginSuccess');
                    router.push('/');
                });
        },
        tryLogin({ commit }, userInfo) {
            axios.post('/users/login', userInfo)
                .then(userResponse => {
                    commit('setUser', userResponse.data);
                    commit('loginSuccess');
                    router.push('/');
                });
        },
        doLogout({ commit }) {
            axios.get('/users/logout')
                .then(() => {
                    commit('setUser', {});
                    commit('logoutSuccess');
                });
        }
    }
});
