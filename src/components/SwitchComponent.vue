<template>
    <div :class="['checkbox-form',{'disabled':config.disabled}]" >
        <div :class="['checkbox-item',{'checked': checked}]" @click="changeSwitch()">
            <div class="switch">
                <div class="dot"></div>
            </div>
        </div>
        <div class="checkbox-desc">
            {{config.label}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'SwitchComponent',
    props: ['config'],
    data: () => ({
        checked: false,
    }),
    watch: {
        config: function(){
            this.checked=this.config.value||false;
        },
    },
    mounted(){
        this.checked=this.config.checked;
    },
    methods: {
        changeSwitch(){
            this.checked=!this.checked;
            this.$emit('changeValue',this.checked);
        }
    }
}
</script>