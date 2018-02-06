<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right" size="small" >
            <el-form-item label="文章标题" class="form-width">
                <el-input v-model="formData.title" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <!--<el-form-item label="文章类型">-->
                <!--<el-select v-model="formData.cat_id" placeholder="请选择文章类型" :disabled="!isCanEdit">-->
                    <!--<el-option-->
                        <!--v-for="item in contentType"-->
                        <!--:key="item.id"-->
                        <!--:label="item.name"-->
                        <!--:value="item.id">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否精选文章">-->
                <!--<el-switch-->
                    <!--:disabled="!isCanEdit"-->
                    <!--v-model="formData.choice"-->
                    <!--active-color="#13ce66"-->
                    <!--inactive-color="#ff4949"-->
                    <!--active-value="1"-->
                    <!--inactive-value="0">-->
                <!--</el-switch>-->
            <!--</el-form-item>-->
            <el-form-item label="作者" class="form-width">
                <el-input v-model="formData.author" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="排序" class="form-width">
                <el-input-number v-model="formData.sort" controls-position="right" :min="1" :max="10" :disabled="!isCanEdit"></el-input-number>
            </el-form-item>

            <el-form-item label="文章头图">
                <bgDiv :imgStr="formData.logo" :isCanEdit="isCanEdit" v-if="formData.logo" key="first"></bgDiv>
                <imgUpload @uploadSuccess="uploader" :max="1" v-if="isCanEdit"></imgUpload>
            </el-form-item>
            <el-form-item label="文章内容">
                <TinyEdit v-model="formData.content" v-if="$route.name!== 'articleDetails'"></TinyEdit>
                <div v-html="formData.content" class="content"></div>
            </el-form-item>
            <el-form-item label="">
                <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
                <el-button type="danger" class="bottom-btn" @click="$router.back()" >返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    import TinyEdit from '@/components/Tinymce'
    export default {
        components: {
            imgUpload,  //七牛上传组件
            bgDiv,    //图片显示组件
            TinyEdit,  //富文本
        },
        name: '',
        data() {
            return {
                formData: {
                    title: '', //文章标题
                    logo: '', //文章头图
                    content: '', //文章内容
                    sort: '',
                    author: '' //作者
                },
                contentType: [],  //选择框数组
                isCanEdit: true,   //是否可以编辑
            }
        },
        methods: {
            save() {
                this.$axios.post('addArticle', this.formData, res => {
                    if (res.ret == true) {
                        this.$message.success('文章添加成功，正在为您跳转文章列表...')
                        setTimeout(() => {
                            this.$router.push('list')
                        }, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateArticle', this.formData, res => {
                    if (res.ret == true) {
                        this.$message.success('文章修改成功，正在为您跳转文章列表...')
                        setTimeout(() => {
                            this.$router.push('list')
                        }, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('article', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0]
                    this.playerOptions.sources[0].src = res.data[0].video
                    this.playerOptions.poster = res.data[0].logo
                })
            },
            uploader(imgList) {
                this.formData.logo = imgList[0]
                if (this.formData.is_video) {
                    this.playerOptions.poster = imgList[0]
                }
                else {
                    this.playerOptions.poster = ''
                }
            },
            getSelect() {
                return new Promise(resolve => {
                    this.$axios.get('articleType', {}, res => {
                        this.contentType = res.data;
                        resolve()
                    })
                })
            },
        },
        created() {


        }
    }
</script>


<style scoped>
    .content {
        border: 1px solid #999;
        border-radius: 5px;
        min-height: 200px
    }

</style>
<style>
    .video-box,.video-box,.video-js{
        position: relative;
        display: block;
        width: 342px;
        height: 132px;
    }
    .vjs-tech {
        width: 100%;
        height: 100%;
    }
    .vjs-big-play-button {
        position: absolute;
        left: 50%!important;
        top: 50%!important;
        transform: translate(-50%, -50%);
    }
</style>
