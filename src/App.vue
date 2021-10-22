<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('authenticate')
  },
  watch: {
    '$route': function(a){
      document.title=a.meta.title
    }
  },
}
</script>

<style lang="css">
@import url(assets/css/main.min.css);
</style>
