<template lang="pug">
    form#login-form(@submit.prevent="doLogin")
        .form-group
            label(for="username") Username
            input.form-control(
                type="text"
                name="username"
                id="username"
                v-model="username"
            )
        .form-group
            label(for="password") Password
            input.form-control(
                type="password"
                name="password"
                id="password"
                v-model="password"
            )
        button.btn.btn-primary Login!
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    computed: mapState(['authenticated']),
    methods: {
        doLogin() {
            this.$store.dispatch('tryLogin', {
                username: this.username,
                password: this.password
            });
        }
    }
}
</script>

<style>
</style>
