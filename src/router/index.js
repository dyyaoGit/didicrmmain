import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * meta : {
    title: 'title'               the title show in submenu and breadcrumb (recommend set)
  }
 **/
export const constantRouterMap = [
    {path: '/', redirect: '/dashboard', hidden: true},
    // {path: '/login', component: _import('login/index'), hidden: true},
    // {path: '/signUp', component: _import('login/signUp'), hidden: true},
    {path: '/404', component: _import('404'), hidden: true},

    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: _import('dashboard/index'),
                meta: {title: '首页'}
            }
        ]
    },
    {
        path: '/Article',
        component: Layout,
        redirect: '/Article/list',
        meta: {title: '文章管理'},
        children: [
            {
                path: 'list',
                component: _import('Article/article'),
                meta: {title: '文章列表页'}
            },
            {
                path: 'addArticle',
                component: _import('Article/addArticle'),
                meta: {title: '添加文章'},
                hidden: true
            },
            {
                path: 'details',
                component: _import('Article/details'),
                meta: {title: '文章详情'},
                hidden: true
            },

        ]
    },


    {path: '*', redirect: '/404', hidden: true}
]


export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

