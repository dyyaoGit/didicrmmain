<template>
    <div id="app">
        <router-view :key="time"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        computed: {
            time() {
                return new Date().getDate();
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import '~normalize.css/normalize.css';
    // normalize.css 样式格式化
    @import './styles/index.scss';
    // 全局自定义的css样式
    @import './styles/iconfont.css'; //全局icon
</style>
