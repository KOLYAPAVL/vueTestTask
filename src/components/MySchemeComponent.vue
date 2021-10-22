<template>
    <div class="schemes_item">
        <div class="schemes-title">{{config.schema.name}}</div>
        <div class="schemes-hover">
            <router-link tag="button" :to="'/schemes/show/'+config.id">Посмотреть</router-link>
            <router-link tag="button" :to="'/schemes/change/'+config.id">Изменить</router-link>
            <button class='delete' @click="del(config.id)">Удалить</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MySchemeComponent',
    props: ['config'],
    methods: {
        del(id){
            this.$store.dispatch('deleteScheme',{'id':id});
        },
    },
}
</script>