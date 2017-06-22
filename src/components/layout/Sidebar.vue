<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="SideBarMenu in SideBarMenus">
                <template v-if="SideBarMenu.subs">
                    <el-submenu :index="SideBarMenu.index">
                        <template slot="title"><i :class="SideBarMenu.icon"></i><span>{{ SideBarMenu.title }}</span></template>
                        <el-menu-item v-for="(subItem, i) in SideBarMenu.subs" :key="i" :index="subItem.index"><span>{{ subItem.title }}</span>
                        <el-button type="success" :plain="true" size="small" v-if="SideBarMenu.addButton">新增</el-button>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="SideBarMenu.index">
                        <i :class="SideBarMenu.icon"></i><span>{{ SideBarMenu.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            SideBarMenus: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/SideBarMenus').then(response => {
        // console.log(response.data)
        this.SideBarMenus = response.data
        })
    }
}
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
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
