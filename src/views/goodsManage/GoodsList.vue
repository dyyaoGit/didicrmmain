<template>
    <div>
        <div class="clearfix">
            <el-button type="danger" style="float: right;margin-bottom: 20px;" @click="$router.push({path: 'upload'})">
                添加商品
            </el-button>
        </div>
        <el-table :data="tableData"  size="small"
                  @selection-change="selectionChange"
                  tooltip-effect="dark"
                  v-loading="loading"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="img"
                width="150"
                label="商品头图"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.img[0]" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="choice"
                label="是否精选"
                width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-if="scope.row.state == 1 "
                        v-model="scope.row.choice"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="1"
                        @change="switchChange(scope.$index)"
                        inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="商品状态"
                width="100"
            >
                <template slot-scope="scope">
                    <strong v-if="scope.row.state == 1">上架状态</strong>
                    <strong v-if="scope.row.state == 2">上架审核中</strong>
                    <strong v-if="scope.row.state == 3">审核不通过</strong>
                    <strong v-if="scope.row.state == 0">下架状态</strong>
                </template>
            </el-table-column>

            <el-table-column
                prop="category.name"
                width="150"
                label="类型"
            >
            </el-table-column>
            <el-table-column label="商品库存" width="100" prop="stock"></el-table-column>
            <el-table-column label="商品简介" width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                        <div   style="overflow: hidden;text-overflow: ellipsis;text-wrap: avoid;white-space: nowrap">{{scope.row.title}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="ems_price"
                width="150"
                label="快递价格"
            >
            </el-table-column>
            <el-table-column
                prop="common"
                width="150"
                label="普通会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="first"
                width="150"
                label="一级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="second"
                width="150"
                label="二级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="third"
                width="150"
                label="三级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="fourth"
                width="150"
                label="四级会员价格"
            >
            </el-table-column>
            <el-table-column label="操作" width="310" fixed="right">
                <template slot-scope="scope">
                    <div class="handle-btn-wrap">
                        <el-button size="mini" type="" v-if="scope.row.state == 0" @click="putAway(scope.row)">上架</el-button>
                        <el-button size="mini" type="" v-if="scope.row.state == 1" @click="putAway(scope.row, 0)">下架</el-button>
                        <el-button size="mini" type="" @click="edit(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="" @click="editPhotos(scope.row.id)">素材编辑</el-button>
                        <el-button size="mini" type="" @click="delGood(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right; margin-top: 20px;">
            <el-pagination
                @current-change="pageChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<style>
    .handle-btn-wrap .el-button {

    }
</style>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [
//                    {
//                        type: [],   //商品分类
//                        name: '',  //商品名称
//                        title: '',  //商品简介
//                        products: [     //商品规格
//                            {
//                                name: '颜色',    //规格名称
//                                tag: ['黄色'],   //规格对应标签
//                                empty: ''               //临时存放
//                            }
//                        ],
//                        content: '',
//                        price: {   //各级会员价格
//                            common: '',
//                            first: '',
//                            second: '',
//                            third: ''
//                        },
//                        ems_price: '',     //邮费
//                        img: [],    //商品轮播图
//                        stock: '',   //商品库存
//                        state: 0,     //上下架状态
//                        browse_num: 0, //浏览量
//                        share_num: 0, //分享量
//                        agent_num: 0, //商品代理数
//                        f_category: {name: ''}
//                    }
                ],
                selection: [],  //选中的部分
                currentPage: 1,
                total: 1,
                loading: false
            }
        },
        methods: {
            selectionChange(val) {
                console.log(val)
                this.selection = val;
            },
            getList() { //获取商品列表
                this.loading = true;
                this.$axios.get('getGoodList', {page: this.currentPage}, res => {
                    if(this.currentPage == 1 && typeof res.msg == 'number'){
                        this.total = res.msg;
                    }
                    res.data.forEach(val => {
                        val.stock = val.products.reduce((pre, next) => {
                            return parseInt(pre.stock) + parseInt(next.stock) ;
                        })
                    })
                    // 求库存总和
                    this.tableData = res.data;
                    this.loading = false;
                })
            },
            edit(id) {
                this.$router.push({path:'edit', query: {id}})
            },
            editPhotos(id) {
                this.$router.push({path: 'fodderManage', query: {id}})
            },
            delGood(id) { //删除商品
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delGood', {id}, res => {
                        if(res.ret == true){
                            this.$message.success('删除成功')
                            this.getList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            putAway(allMsg, state=2) {  //发送上架申请
                let msg = state == 2 ? '上架' : '下架'
                this.$confirm(`此操作将向平台发送${msg}审核申请,平台同意后方可${msg}， 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
//                    delete allMsg['f_category']
//                    delete allMsg['s_category']
                    let newMsg = {...allMsg,state}
                    console.log(newMsg)
                    this.$axios.post('updateGoodList', newMsg, res => {
                        if(res.ret == true){
                            this.$message.success('申请成功，请耐心等待平台审核')
                            this.getList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            pageChange(val) {
               this.getList()
            },
            switchChange(index) {
                this.$axios.post('updateGood', this.tableData[index], res => {
                    if(res.ret){
                        this.$message.success('操作成功，正在刷新数据')
                        this.getList();
                    }
                })

            }
        },
        mounted() {
            this.getList();
        }
    }
</script>


<style scoped>


</style>
