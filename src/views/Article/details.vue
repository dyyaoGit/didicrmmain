<template>
    <div>
        <div class="content" v-html="article"></div>
        <el-button @click="$router.back()" type="danger">返回</el-button>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                article: ''
            }
        },
        methods: {
            getData() {
                this.$axios.get('getArticleList', {id: this.$route.query.id}, res => {
                    this.article = res.data[0].content;
                })
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
