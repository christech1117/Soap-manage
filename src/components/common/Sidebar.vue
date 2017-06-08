<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i><span>{{ item.title }}</span></template>
                        <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index"><span>{{ subItem.title }}</span>
                        <el-button type="success" :plain="true" size="small" v-if="item.subs[i].addButton">新增</el-button>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i><span>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'fa fa-home fa-lg',
                        index: '/dashboard',
                        title: 'Dashboard'
                        
                    },
                    {
                        icon: 'fa fa-user fa-lg',
                        index: '/user',
                        title: '人員管理'
                    },
                    {
                        icon: 'fa fa-file-text-o fa-lg',
                        index: '2',
                        title: '文章管理',
                        subs: [
                            {
                                index: '/news',
                                title: '最新消息',
                                addButton: true
                            },
                            {
                                index: '/comment',
                                title: '評論管理',
                            }
                        ]
                    },
                    {
                        icon: 'fa fa-cubes fa-lg',
                        index: '3',
                        title: '商品管理',
                        subs: [
                            {
                                index: '/productList',
                                title: '商品列表',
                                addButton: true
                            }
                        ]
                    },
                    {
                        icon: 'fa fa-bars fa-lg',
                        index: '4',
                        title: '分類管理',
                        subs: [
                            {
                                index: '/navbarMenu',
                                title: '巡覽列'
                            },
                            {
                                index: '/bannerMenu',
                                title: '分頁大圖'
                            },
                            {
                                index: '/productMenu',
                                title: '商品分類'
                            },
                        ]
                    },
                    {
                        icon: 'fa fa-bar-chart fa-lg',
                        index: '5',
                        title: '數據統計',
                        subs: [
                            {
                                index: '/productList',
                                title: '折線圖'
                            },
                            {
                                index: '/productList',
                                title: '長條圖'
                            },
                            {
                                index: '/productList',
                                title: '圓餅圖'
                            }
                        ]
                    },
                    {
                        icon: 'fa fa-cog fa-lg',
                        index: '/setting',
                        title: '設置'
                    },
                ]
            }
        },
        computed:{
            onRoutes () {
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .fa {
        margin-right: 10px;
        width: 1em;
    }
    span {
        font-size: 1rem;
    }
    .el-button {
        font-size: .9rem;
    }
</style>
