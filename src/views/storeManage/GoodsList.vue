<template>
    <div>
        <div class="clearfix" style="margin-bottom: 20px;">
            <h3 style="float: left;">已参与活动列表</h3>
            <el-button type="danger" style="float:right;" @click="add($route.query.id)">添加商品到该活动</el-button>
        </div>
        <el-table :data="tableData" border size="mini" >
            <el-table-column prop="name" label="商品名"></el-table-column>
            <el-table-column prop="logo" label="商品头图">
                <template slot-scope="scope">
                    <img :src="scope.row.img[0]" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 0">审核中</span>
                    <span v-if="scope.row.state == 1">审核通过</span>
                    <span v-if="scope.row.state == 2">审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                    <!--<el-button type="danger" size="mini" @click="add(scope.row.id)">申请参加</el-button>-->
                    <el-button size="mini" type="primary" @click="showDetails(scope.row.goods_id)">查看详细</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [

                ]
            }
        },
        methods: {
            getData() {
                this.$axios.get('getAct', {kill_id: this.$route.query.id}, res => {
                    if(res.ret){
                        this.tableData = res.data;
                    }
                })
            },
            add(id) {  //跳转到申请活动页面添加商品
                this.$router.push({path: 'applyGoods', query: {id}})
            },
            remove(id) {
                this.$confirm('此操作将删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delTag', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
            },
            showDetails(id) {
                this.$router.push({path: 'showDetails', query: {actId: this.$route.query.id, goodsId: id}})
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>


<style scoped>


</style>
