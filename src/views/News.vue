<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 人員管理
      .top-option
        el-button(type='success' size='large' icon='check') 儲存
        el-button(type='info' size='large' icon='plus') 新增
  el-table(:data='news', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='date', label='發佈日期', sortable='', width='180')
    el-table-column(label='新聞圖片', width='180')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.image')
        .cover(v-show='!scope.row.edit', :style="{ 'background-image': `url(${scope.row.image })` }")
    el-table-column(label='新聞標題')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='text', v-model='scope.row.title')
        span(v-show='!scope.row.edit') {{ scope.row.title }}
    el-table-column(label='發佈', width='120')
      template(scope='scope')
        el-switch(v-model='scope.row.auth', on-text='發佈', off-text='草稿', on-color='#13ce66')
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='scope.row.edit=true', size='', icon='edit') 编辑
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, news)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')

</template>

<script>
export default {
    data() {
        return {
            news: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/news').then(response => {
        console.log(response.data)
        this.news = response.data
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
        handleDelete (index, rows) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                rows.splice(index, 1)
                this.$notify({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$notify({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
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
.cover {
    width: 120px;
    height: 100px;
    background-color: #eee;
    position: relative;
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
    transition: 0.5s;
}
</style>
