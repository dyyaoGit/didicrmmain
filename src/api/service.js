export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },
    baseURL: 'http://localhost:3010/',

    //qiniu相关
    qiniu: 'upload',


    //文章列表

    getArticleList: 'crm/article/get',
    addArticle: 'crm/article/add'

}
