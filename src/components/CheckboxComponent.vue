<template>
    <div class="checkbox-form">
        <div class="checkbox-checkbox">
            <input type="checkbox" :checked="checked" @click="checked=!checked">
        </div>
        <div class="checkbox-label">
            {{config.label}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckboxComponent',
    props: ['config'],
    data: () => ({
        checked: false,
    }),
    watch: {
        checked: function(a){
            this.$emit('changeValue',a);
        }
    }
}
</script>