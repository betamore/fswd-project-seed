<template lang="pug">
    #app
        div(v-if="!loading")
            nav-bar
            .container
                router-view
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './NavBar.vue';

export default {
    name: 'app',
    components: { NavBar },
    computed: mapState(['loading']),
    created() {
        this.$store.dispatch('checkLogin');
    }
}
</script>

<style>
</style>
