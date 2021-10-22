<template>
    <div id='createScheme'>
        <Header></Header>
        <section class="content">
            <div class="container" v-if="detailScheme.id">
                <div class="test-form">
                    <div class="content-title">{{detailScheme.schema.name}}</div>
                    <TestFormComponent v-for="item in detailScheme.schema.fields" :ref="'show-'+item.key" :key="item.key" :config="item"></TestFormComponent>
                    <div class="test-form_item" style='margin-top:40px;'>
                        <button class="button button-cover" @click="validate()">Валидация</button>
                     </div>
                     <div :class="['alert','alert-'+alert.type]" v-if="alert.type">
                         {{alert.text}}
                     </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AuthMixin from '../mixins/auth.mixin'
import TestFormComponent from '../components/TestFormComponent.vue';

export default {
    name: 'ShowSchemes',
    mixins: [AuthMixin],
    data: () => ({
        alert: {type:null,text:''}
    }),
    computed: {
        ...mapGetters([
            'detailScheme',
        ])
    },
    mounted(){
        this.$store.dispatch('detailScheme',{'id': this.$route.params.id });
    },
    methods: {
        validate(){
            let scs=0;
            for(var i in this.detailScheme.schema.fields){
                const o = this.$refs['show-'+this.detailScheme.schema.fields[i].key][0];
                if(o.isValid()) scs += 1;
            }
        
            if(scs==this.detailScheme.schema.fields.length){
                this.alert={type:'success',text:'Валидация пройдена успешно'}
            }else{
                this.alert={type:'error',text:'Валидация не пройдена'}
            }
        }
    },
    components:{TestFormComponent},
}
</script>