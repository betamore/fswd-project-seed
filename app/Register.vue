<template lang="pug">
  form(@submit.prevent="doRegister")
    .form-group(v-bind:class="{ 'has-danger': !userIsAvailable }")
      label(for="username") Username
      input.form-control(:class="{ 'is-invalid': !userIsAvailable }" type="text" name="username" v-model="username" required)
      p.text-danger(v-show="!userIsAvailable") Username must be unique.
    .form-group
      label(for="email") Email Address
      input.form-control(type="email" name="email" v-model="email" required)
    .form-group(:class="{ 'is-invalid': !passwordMatch }")
      label(for="password") Password
      input.form-control(:class="{ 'is-invalid': !passwordMatch }" type="password" name="password" v-model="password" required)
      label(for="password_confirm") Confirm Password
      input.form-control(:class="{ 'is-invalid': !passwordMatch }" type="password" name="password_confirm" v-model="password_confirm")
    button.btn.btn-primary(type="submit" :disabled="!formValid") Register!
</template>

<script>
import axios from 'axios';

export default {
    name: 'register',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password_confirm: '',
            userIsAvailable: true
        };
    },
    computed: {
        passwordMatch() {
            return this.password === this.password_confirm;
        },

        formValid() {
            return this.passwordMatch && this.userIsAvailable;
        }
    },
    watch: {
        username(val) {
            axios.post('/users/available', { username: this.username })
                .then(response => {
                    this.userIsAvailable = response.data.isAvailable;
                });
        }
    },
    methods: {
        doRegister() {
            this.$store.dispatch('tryRegister', {
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm
            });
        }
    }
}
</script>

<style>
</style>
