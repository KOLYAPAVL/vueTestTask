<template>
    <div id="createScheme">
        <Header></Header>
        <section class="content">
            <div class="container">
                <div class="content-title">Новая схема</div>
                <Input @keyup="errors.name=false" :config="{label:'Название схемы',important:true,type:'text',placeholder:'Укажите название схемы',error:errors.name}" @changeValue="function(a){name=a}"></Input>
                <div :class="['scheme-info', {'moreone':schemes.length>1}]">
                    <div class="content-title">Свойства схемы</div>
                    <div class="content-description">Схема должна содержать хотя бы одно свойство</div>
                    <PropertyComponent v-for="item in schemes" :ref="'property-'+item.id" :key="item.id" @click="clickProperty(item.id)" @delete="deleteProperty(item.id)" :config="{id:item.id,opened:item.opened,index:schemes.indexOf(item)+1}"></PropertyComponent>
                    <div class="alert alert-error" style='margin-top:20px;' v-if="alert">
                        {{alert}}
                    </div>
                    <div class="scheme-actions">
                        <div class="scheme-button-left">
                            <button class="button button-inline" @click="addNewSchame()">Добавить новое свойство</button>
                        </div>
                        <div class="scheme-button-right">
                            <button class="button button-cover" @click="saveSchame">Сохранить схему</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import PropertyComponent from '../components/PropertyComponent.vue';
import AuthMixin from '../mixins/auth.mixin';
import {Schemes} from '../core/schemes';

export default {
    name: 'createSchemes',
    data: () => ({
        schemes:[],
        name: "",
        errors: {
            name: false,
        },
        alert: '',
        idSchemesStart:0,
    }),
    mixins: [AuthMixin],
    mounted(){
        this.schemes=[];
        this.addNewSchame();
    },
    methods: {
        clickProperty(id){
            for(var i in this.schemes){
                if(this.schemes[i].id != id) this.schemes[i].opened=false;
                else this.schemes[i].opened=true;
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
                const r = await Schemes.create({
                    name: this.name,
                    fields: fields,
                })
                if(r.success) return this.$router.push('/schemes/show/'+r.id);
                else this.alert='По неизвестной ошибке не получилось создать форму';
                return false
            }else{
                return false
            }
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
        addNewSchame(){
            for(var i in this.schemes) this.schemes[i].opened=false;
            this.idSchemesStart+=1;
            this.schemes.push({
                id:this.idSchemesStart,
                opened:true,
            })
        },
    },
    components: {PropertyComponent},
}
</script>