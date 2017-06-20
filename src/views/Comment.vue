<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 評論管理
  el-table(:data='users', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='date', label='註冊日期', sortable='', width='180')
    el-table-column(label='姓名', width='180')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.name')
        span(v-show='!scope.row.edit') {{ scope.row.name }}
    el-table-column(label='信箱')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='email', v-model='scope.row.mail')
        span(v-show='!scope.row.edit') {{ scope.row.mail }}
    el-table-column(label='手機', width='230')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='phone', v-model='scope.row.phone')
        span(v-show='!scope.row.edit') {{ scope.row.phone }}
    el-table-column(label='權限', width='120')
      template(scope='scope')
        el-switch(v-model='scope.row.auth', on-text='', off-text='', on-color='#13ce66')
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='scope.row.edit=true', size='', icon='edit') 编辑
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, users)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')

</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/users').then(response => {
        console.log(response.data)
        this.users = response.data
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
        },
        handleCurrentChange () {
            
        }
    }
}
</script>
<style lang="sass">
.el-table, .el-input 
  font-size: 1.2rem
   
.el-table-column
  transition: all 1s
</style>
