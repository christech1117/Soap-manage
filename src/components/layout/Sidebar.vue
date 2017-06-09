<template>
    <div class="sidebar">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" theme="light" unique-opened router>
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
    data () {
        return {
            items: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/items').then(response => {
        console.log(response.data)
        this.items = response.data
        })
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
