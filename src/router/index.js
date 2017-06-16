import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dashboard',
            component: resolve => require(['../components/layout/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../views/Readme.vue'], resolve)
                },
                {
                    path: '/user',
                    component: resolve => require(['../views/user.vue'], resolve)
                },
                {
                    path: '/news',
                    component: resolve => require(['../views/News.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/comment',
                    component: resolve => require(['../views/Comment.vue'], resolve)
                },
                {
                    path: '/productList',
                    component: resolve => require(['../views/ProductList.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/navbarMenu',
                    component: resolve => require(['../views/NavbarMenu.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/bannerMenu',
                    component: resolve => require(['../views/BannerMenu.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/ProductMenu',
                    component: resolve => require(['../views/ProductMenu.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/lineChart',
                    component: resolve => require(['../components/chart/LineChart.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/barChart',
                    component: resolve => require(['../components/chart/BarChart.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/pieChart',
                    component: resolve => require(['../components/chart/PieChart.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/mixChart',
                    component: resolve => require(['../components/chart/MixChart.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/chart/MixChart.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
    ]
})
