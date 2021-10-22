export default {
    watch: {
        '$store.getters.isAuth': function(){this.validAuth()},
    },
    mounted(){
        this.validAuth();
    },
    methods: {
        validAuth(){
            if(this.$store.getters.isAuth===false) this.$router.push('/')
        },
    }
}