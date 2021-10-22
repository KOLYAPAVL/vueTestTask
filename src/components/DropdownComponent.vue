<template>
    <div :class="['dropdown',{'error':config.error}]">
        <div class="dropdown_label"><b v-if="config.important">*</b> {{config.label}}</div>
        <div :class="['dropdown__item',{'opened':this.opened}]" :id="config.key">
            <div :class="['dropdown-active',{'placeholder':!value}]" @click="function(){opened=!opened}">{{ !value ? config.placeholder ? config.placeholder : '' : value }}</div>
            <div class="dropdown__list">
                <div :class="['dropdown__list-item',{'default':item[0]==valueCode}]" v-for="item in config.list" :key="item[0]" @click="setActive(item)">
                    {{item[1]}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DropdownComponent',
    props: ['config'],
    data: () => ({
        opened: false,
        value: null,
        valueCode: null,
    }),
    watch: {
        'config.value': function(){
            if(this.config.value){
                this.valueCode=this.config.value;
                for(var i in this.config.list){
                    if(this.config.list[i][0]==this.valueCode){
                        this.value=this.config.list[i][1];
                    }
                }
            }
        },
    },
    created(){
        if(this.config.key){
            document.addEventListener('click', this.checkerContains);
        }
    },
    mounted(){
        if(!this.config.value && !this.config.placeholder && this.config.list.length > 0){
            this.valueCode=this.config.list[0][0]
            this.value=this.config.list[0][1]
        }
        else if(this.config.value){
            this.valueCode=this.config.value;
            for(var i in this.config.list){
                if(this.config.list[i][0]==this.valueCode){
                    this.value=this.config.list[i][1];
                }
            }
        }
    },
    methods: {
        checkerContains(e){
            if(!(document.getElementById(this.config.key)).contains(e.target)){
                this.opened=false;
            }
        },
        setActive(val){
            this.valueCode=val[0];
            this.value=val[1]
            this.opened=false;
            this.$emit('changeValue', {
                key: val[0],
                value: val[1],
                data: val[2],
            })
        }
    },
    destroyed(){
        document.removeEventListener('click',this.checkerContains);
    }
}
</script>