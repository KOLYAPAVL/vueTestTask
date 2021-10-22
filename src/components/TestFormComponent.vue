<template>
    <div class='test-form_item'>
        <div class='test-form_item-content' v-if="['number','string','password','phone'].includes(config.type)">
            <Input @keyup="error=false;" @changeValue="(a) => value=a" :config="{label: config.label,placeholder:`Введите ${config.label.toLowerCase()}`,important:config.validation.required,type:config.type,error:error}"></Input>
        </div>
        <div class='test-form_item-content' v-if="config.type=='select'">
            <Dropdown @changeValue="(a) => {value=a;this.error=false;}" :config="{label:config.label,placeholder:`Выберите ${config.label.toLowerCase()}`,important:config.validation.required,list:getCorrectList(),error:error}"></Dropdown>
        </div>
        <div class='test-form_item-content' v-if="config.type=='checkbox'">
            <Checkbox @changeValue="(a) => {value=a;}" :config="{label:config.label,important:config.validation.required}"></Checkbox>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TestFormValidate',
    props: ['config'],
    data: () => ({
        value:"",
        error: false,
    }),
    mounted(){
        if(this.config.type=="checkbox") this.value=false;
    },
    methods: {
        getCorrectList(){
            let a = []
            for(var i in this.config.options){
                a.push([this.config.options[i].key,this.config.options[i].value,[]])
            }
            return a;
        },
        isValid(){
            if(this.config.validation.required && this.value===""){
                this.error=true;
                return false;
            }
            if(this.config.validation.min){
                if(this.config.type!="number" && this.value.length < parseFloat(this.config.validation.min)){
                    this.error=true;
                    return false;
                }else if(this.config.type=="number" && parseFloat(this.value) < parseFloat(this.config.validation.min)){
                    this.error=true;
                    return false;
                }
            }
            if(this.config.validation.max){
                if(this.config.type!="number" && this.value.length > parseFloat(this.config.validation.max)){
                    this.error=true;
                    return false;
                }else if(this.config.type=="number" && parseFloat(this.value) > parseFloat(this.config.validation.max)){
                    this.error=true;
                    return false;
                }
            }
            if(this.config.validation.pattern && !(new RegExp(this.config.validation.pattern).test(this.value))){
                this.error=true;
                return false;
            }

            if(this.config.type=="phone" && !(/^\+?[7][(]?\d{3}\)?([ ]?)([0-9]{3})?([-]([0-9]{2})[-]([0-9]{2}))$/ig.test(this.value)) & !(/^[8][ ][(]?\d{3}\)?([ ]?)([0-9]{3})?([-]([0-9]{2})[-]([0-9]{2}))$/ig.test(this.value))){
                this.error=true;
                return false;
            }

            return true;
        }
    },
}
</script>