<template>
    <div :key="config.id" @click="$emit('click',true)" :class="['scheme-property',{'opened': config.opened,'validationOpen': data.type != ''}]">
        <div class="scheme-property-header">
            <div class="scheme-header-title">
                <div class="left">
                    Свойство {{ config.index }}
                </div>
                <div class="right">
                    Валидация
                </div>
            </div>
            <div class="scheme-header-desc">{{activeTypeObj.value}};{{data.label}}</div>
            <div class="scheme-header-delete" @click="function(){$emit('delete',true)}"></div>
        </div>
        <div class="scheme-property-content">
            <div class="left">
                <Input @keyup="errors.key=false" :config="{label:'Ключ свойства',important:true,type:'text',placeholder:'Укажите ключ свойства',error:errors.key,value:data.key}" @changeValue="function(a){data.key=a}"></Input>
                <Input @keyup="errors.name=false" :config="{label:'Название свойства',important:true,type:'text',placeholder:'Укажите название свойства',error:errors.name,value:data.label}" @changeValue="function(a){data.label=a}"></Input>
                <Dropdown :config="{key:'dropdown'+config.id,label:'Поле для отображения',important:true,placeholder:'Выберите поле для отображения',error:errors.dropdown,list:fieldsList,value:data.type}" @changeValue="function(a){dropdownSelect(a);errors.dropdown=false}"></Dropdown>
                <div class="scheme-input-lists" v-if="data.type=='select'">
                    <div class="scheme-input-lists__item" v-for="input in data.options" :key="input.id">
                        <Input @keyup="errors.dropdownOptions=false;" :config="{type:'text',placeholder:'имя опции',error:errors.dropdownOptions,delete:true,value:input.value}" @changeValue="function(a){input.value=a}" @delete="function(){deleteInput(input);}"></Input>
                        <Input @keyup="errors.dropdownOptions=false;" :config="{type:'text',placeholder:'ключ опции',error:errors.dropdownOptions,value:input.key}" @changeValue="function(a){input.key=a}"></Input>
                    </div>
                    <div class="input-form">
                        <button :class="['input-button',{'error':errors.dropdownOptions}]" @click="function(){addNewInput();errors.dropdownOptions=false;}">Добавить вариант</button>
                    </div>
                </div>
            </div>
            <div class="right">
                <Switcher v-if="data.validations.required!=null" :config="{checked: data.validations.required,label:'Обязательно для заполнения',value:data.validations.required}" @changeValue="function(a){data.validations.required=a}"></Switcher>
                <div class='two-forms-field' v-if="'min' in data.validations || 'max' in data.validations">
                    <Input v-if="data.validations.min!=null" :config="{type:'text',label:data.type=='number'?'Мин. значение':'Мин. кол-во символов',value:data.validations.min}" @changeValue="function(a){data.validations.min=a}"></Input>
                    <Input v-if="data.validations.max!=null" :config="{type:'text',label:data.type=='number'?'Макс. значение':'Макс. кол-во символов',value:data.validations.max}" @changeValue="function(a){data.validations.max=a}"></Input>
                </div>
                <Input v-if="data.validations.pattern!=null" :config="{type:'text',label:'Шаблон ввода',placeholder:'Шаблон ввода',value:data.validations.pattern}" @changeValue="function(a){data.validations.pattern=a}"></Input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PropertyComponent',
    props: ['config'],
    data: () => ({
        data: {
            key: "",
            label: "",
            type: "",
            options: [],
            validations: {
                required:null,
                min:null,
                max:null,
                pattern:null,
            },
        },
        errors: {
            key: false,
            name: false,
            dropdown: false, 
            dropdownOptions: false,
        },
        fieldsList: [],
        keysOptions: [],
        activeTypeObj: {name:""},
    }),
    methods: {
        dropdownSelect(a){
            this.data.type=a.key
            this.activeTypeObj=a;
            this.data.options=[];

            this.data.validations={required:null,min:null,max:null,pattern:null}
            for(var i in a.data){
                let val;
                if(a.data[i] == 'required') val = true;
                this.data.validations[a.data[i]] = val || "";
            }
        },
        isValid(){
            let valid = true;
            if(this.data.key == ''){
                valid=false;
                this.errors.key=true;
            }
            if(this.data.label == ''){
                valid = false;
                this.errors.name=true;
            }
            if(this.data.type == ''){
                valid = false;
                this.errors.dropdown=true;
            }
            if(this.data.type == 'select'){
                if(this.data.options.length==0){
                    valid = false;
                    this.errors.dropdownOptions = true;
                }
                for(var i in this.data.options){
                    if(this.data.options[i].value=='' || this.data.options[i].key==''){
                        valid = false;
                        this.errors.dropdownOptions = true;
                    } 
                }
            }

            return valid;
        },
        getData(){
            let a = {
                key: this.data.key,
                label: this.data.label,
                type: this.data.type,
                validation: {},
            }
            
            if(a.type=='select'){
                a.options = [];
                for(var i in this.data.options){
                    a.options.push({
                        key:this.data.options[i].key,
                        value:this.data.options[i].value,
                    })
                }
            }

            for(i in this.data.validations){
                if(this.data.validations[i]!==null&&this.data.validations[i]!=='') a.validation[i] = this.data.validations[i]
            }

            return a;
        },
        deleteInput(item){
            this.data.options.splice(this.data.options.indexOf(item),1);
        },
        addNewInput(){
            this.data.options.push({id: this.data.options.length+1,key: '',value: ''})
        }
    },
    mounted(){
        const a = require('../config/fields.json');
        for(var i in a){this.fieldsList.push([a[i].key,a[i].name,a[i].validation])}
        if(this.config.default){
            for(i in a){
                if(a[i].key==this.config.default.type) this.activeTypeObj = {
                    value: a[i].name,
                    key: a[i].key,
                    data: a[i].validation,
                }
            }
            this.data = {
                key: this.config.default.key,
                label: this.config.default.label,
                type: this.config.default.type,
                options: [],
                validations: {
                    required:null,
                    min:null,
                    max:null,
                    pattern:null,
                },
            }
            for(i in this.activeTypeObj.data){
                let name = this.activeTypeObj.data[i];
                if(this.config.default.validation[name]!==undefined){
                    this.data.validations[name] = this.config.default.validation[name]
                }else{
                    if(name != 'required'){
                        this.data.validations[name] = ""
                    }else{
                        this.data.validations[name] = true;
                    }
                }
            }
            for(i in this.config.default.options){
                let id = this.data.options.length+1;
                this.data.options.push({
                    id: id,
                    key: this.config.default.options[i].key,
                    value: this.config.default.options[i].value
                })
            }
        }
    },
}
</script>