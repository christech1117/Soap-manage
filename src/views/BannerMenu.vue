<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 分頁大圖
  el-table(:data='NavBarMenus', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(label='標題')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.title')
        span(v-show='!scope.row.edit') {{ scope.row.title }}
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='scope.row.edit=true', size='', icon='edit') 编辑
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
</template>

<script>
export default {
    data() {
        return {
            NavBarMenus: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/NavBarMenus').then(response => {
        console.log(response.data)
        this.NavBarMenus = response.data
        })
    },
    methods: {
        edit (index, rows) {
            console.log(rows[index])
        },
        save (index, rows) {   
            rows.editAble = false
            console.log(rows.editAble)
        },
    }
}
</script>
<style>

.el-table, .el-input {
    font-size: 1.2rem;
}
.el-table-column {
    transition: all 1s;
}
</style>
