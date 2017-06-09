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
                    component: resolve => require(['../views/BaseTable.vue'], resolve)
                },
                {
                    path: '/news',
                    component: resolve => require(['../views/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/comment',
                    component: resolve => require(['../views/BaseForm.vue'], resolve)
                },
                {
                    path: '/productList',
                    component: resolve => require(['../views/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/navbarMenu',
                    component: resolve => require(['../views/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/bannerMenu',
                    component: resolve => require(['../views/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/lineChart',
                    component: resolve => require(['../views/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/barChart',
                    component: resolve => require(['../views/BaseCharts.vue'], resolve)   // vue-schart组件
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
                    component: resolve => require(['../views/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
    ]
})
