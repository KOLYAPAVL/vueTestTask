<template>
    <header class="header">
        <div class="container">
            <div class="header-logo-wrapper">
                <router-link class="header-logo" tag="div" to="/schemes"></router-link>
            </div>
            <nav class="header-nav">
                <router-link v-for="item in navbar" :key="item.link" class="header-nav_item" tag="a" :to="item.link" active-class="active" :exact="item.link=='/schemes'">
                    {{item.title}}
                </router-link>
            </nav>
            <div class="header-logout-wrapper">
                <button class="logout-btn" @click="logout">Выйти</button>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'HeaderComponent',
    data: () => ({
        navbar: require('../config/navbar.json'),
    }),
    methods: {
        logout(){
            this.Authentication.logout();
            this.$store.dispatch('authenticate');
        }
    }
}
</script>