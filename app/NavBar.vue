<template lang="pug">
    .container
        nav.navbar.navbar-light.bg-light.navbar-expand-lg
            router-link.navbar-brand(to="/") FSWD
            button.navbar-toggler(type="button"
                                  data-toggle="collapse"
                                  data-target="#navbarNav"
                                  aria-controls="navbarNav"
                                  aria-expanded="false"
                                  aria-label="Toggle navigation")
                span.navbar-toggler-icon
            .collapse.navbar-collapse#navbarNav
                ul.navbar-nav
                    li.nav-item.active
                        router-link.nav-link(to="/") Home #[span.sr-only (current)]
                    li.nav-item(v-if="!authenticated")
                        router-link.nav-link(to="/users/login") Sign In
                    li.nav-item(v-if="!authenticated")
                        router-link.nav-link(to="/users/register") Register
                    li.nav-item(v-else)
                        a.nav-link(href="" @click.prevent="doLogout") Logout
                span.ml-auto.navbar-text(v-if="authenticated") Hello, {{ user.username }}.
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: mapState(['authenticated', 'user']),
    methods: mapActions(['doLogout'])
}
</script>

<style>
</style>
