<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 商品管理
      .top-option
        el-button(type='success' size='large' icon='check') 儲存
        el-button(type='info' size='large' icon='plus') 新增
  el-table(:data='products', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='date', label='上架日期', sortable='', width='180')
    el-table-column(label='商品圖片', width='200', align='center')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='email', v-model='scope.row.image')
        .cover(v-show='!scope.row.edit', :style="{ 'background-image': `url(${scope.row.image})`}")
    el-table-column(label='商品名稱', width='180')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.name')
        span(v-show='!scope.row.edit') {{ scope.row.name }}
    el-table-column(label='評分')
      template(scope='scope')
        el-rate(v-model="scope.row.score", disabled, show-text, text-color="#ff9900", text-template="{value}")
    el-table-column(label='折扣', width='120')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
        span(v-show='!scope.row.edit') {{ scope.row.discount }}
    el-table-column(label='售價', width='120')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
        span(v-show='!scope.row.edit') {{ scope.row.price }}
    el-table-column(label='狀態', width='120')
      template(scope='scope')
        el-switch(v-model='scope.row.auth', on-text='上架', off-text='下架', on-color='#13ce66')
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='scope.row.edit=true', size='', icon='edit') 编辑
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, products)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')
</template>

<script>
export default {
    data() {
        return {
            products: []
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/products').then(response => {
        console.log(response.data)
        this.products = response.data
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
