<template>
    <div id='createScheme'>
        <Header></Header>
        <section class="content">
            <div class="container" v-if="changeScheme.id">
                <div class="content-title">Изменить схему #{{changeScheme.id}}</div>
                <Input @keyup="errors.name=false" :config="{label:'Название схемы',important:true,type:'text',placeholder:'Укажите название схемы',error:errors.name,value:name}" @changeValue="function(a){name=a}"></Input>
                <div :class="['scheme-info', {'moreone':schemes.length>1}]">
                    <div class="content-title">Свойства схемы</div>
                    <div class="content-description">Схема должна содержать хотя бы одно свойство</div>
                    <PropertyComponent v-for="item in schemes" :ref="'property-'+item.id" :key="item.id" @click="clickProperty(item.id)" @delete="deleteProperty(item.id)" :config="{id:item.id,opened:item.opened,default:item.obj,index:schemes.indexOf(item)+1}"></PropertyComponent>
                    <div class="alert alert-error" style='margin-top:20px;' v-if="alert">
                        {{alert}}
                    </div>
                    <div class="scheme-actions">
                        <div class="scheme-button-left">
                            <button class="button button-inline" @click="addNewSchame()">Добавить новое свойство</button>
                        </div>
                        <div class="scheme-button-right">
                            <button class="button button-cover" @click="saveSchame">Изменить схему</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import PropertyComponent from '../components/PropertyComponent.vue'
import { mapGetters } from 'vuex'
import AuthMixin from '../mixins/auth.mixin'
import {Schemes} from '../core/schemes'

export default {
    name: 'ChangeScheme',
    mixins: [AuthMixin],
    data: () => ({
        schemes: [],
        name: "",
        errors: {
            name: false,
        },
        alert: '',
        idSchemesStart:0,
    }),
    computed: {
        ...mapGetters([
            'changeScheme',
        ])
    },
    watch: {
        'changeScheme': function(){
            this.name=this.changeScheme.schema.name;
            for(var i in this.changeScheme.schema.fields){
                this.idSchemesStart+=1;
                this.schemes.push({
                    id: this.idSchemesStart,
                    obj: this.changeScheme.schema.fields[i],
                    opened: this.idSchemesStart==1 ? true : false,
                })
            }
        }
    },
    mounted(){
        this.$store.dispatch('loadScheme',{'id': this.$route.params.id });
    },
    destroyed(){
        this.$store.commit('clearChangeSchame');
    },
    methods:{
        addNewSchame(){
            for(var i in this.schemes) this.schemes[i].opened=false;
            this.idSchemesStart+=1;
            this.schemes.push({
                id:this.idSchemesStart,
                opened:true,
            })
        },
        deleteProperty(id){
            for(var i in this.schemes){
                if(this.schemes[i].id == id){
                    let opened = this.schemes[i].opened;
                    this.schemes.splice(i,1);
                    if(opened) this.schemes[0].opened=true;
                }
            }
        },
        async saveSchame(){
            this.alert='';
            if(this.name.length == 0){
                return this.errors.name=true;
            }
            let fields = []
            for(var i in this.schemes){
                const p = this.$refs['property-'+this.schemes[i].id][0];
                if(p.isValid()) fields.push(p.getData())
            }
            if(fields.length == this.schemes.length){
                const r = await Schemes.save(this.$route.params.id,{
                    name: this.name,
                    fields: fields,
                })
                if(r.success) return this.$router.push('/schemes/show/'+this.$route.params.id);
                else this.alert='По неизвестной ошибке не получилось изменить форму';
                return false
            }else{
                return false
            }
        },
        clickProperty(id){
            for(var i in this.schemes){
                if(this.schemes[i].id != id) this.schemes[i].opened=false;
                else this.schemes[i].opened=true;
            }
        },
    },
    components: {PropertyComponent},
}
</script>