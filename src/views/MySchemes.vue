<template>
    <div id="mySchemes">
        <Header></Header>
        <section class="content">
            <div class="container">
                <div class="content-title">Мои схемы</div>
                <div class="schemes-list" v-if="mySchemes.length > 0">
                    <MySchemeComponent v-for="item in mySchemes" :key="item.id" :config="item"></MySchemeComponent>
                </div>
                <div class="schemes-list" v-else>
                    <div class="schemes_item">
                        <div class="schemes-title">
                            К сожалению схемы не найдены.
                        </div>
                    </div>
                </div>
                <div class="schemes-create">
                    <router-link tag="button" to="/schemes/create" class="button button-cover">Создать схему</router-link>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AuthMixin from '../mixins/auth.mixin';
import MySchemeComponent from '../components/MySchemeComponent.vue';

export default {
    name: 'mySchemes',
    mixins: [AuthMixin],
    computed: {
        ...mapGetters([
            'mySchemes',
        ])
    },
    mounted(){
        this.$store.dispatch('loadMySchemes');
    },
    destroyed(){
        this.$store.commit('clearMySchemes');
    },
    components: {MySchemeComponent}
}
</script>