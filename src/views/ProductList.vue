<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 商品管理
      .top-option
        // el-button(type='success' size='large' icon='check' @click="update") 儲存
        el-button(type='info' size='large' icon='plus' @click="handleAdd") 新增
  el-table(:data='products', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='create_at', label='上架日期', sortable='', width='180')
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
    // el-table-column(label='折扣', width='120')
    //   template(scope='scope')
    //     el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
    //     span(v-show='!scope.row.edit') {{ scope.row.discount }}
    el-table-column(label='售價', width='120')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
        span(v-show='!scope.row.edit') {{ scope.row.price }}
    el-table-column(label='狀態', width='120')
      template(scope='scope')
        el-switch(v-model='scope.row.auth', on-text='上架', off-text='下架', on-color='#13ce66')
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='handleUpdate(scope.$index, products)', size='', icon='edit') 編輯
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, products)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')
    // pre {{ products }}

  el-dialog(title='商品資料', :visible.sync='dialogFormVisible')
    el-form(:model='addProduct')
        el-form-item(label='商品圖片', :label-width='formLabelWidth')
            el-upload.upload-demo(drag='', action='https://httpbin.org/post', multiple='' :on-success="handleImageSuccess")
                img(v-if="imageUrl" :src="imageUrl" class="avatar")
                i.el-icon-upload
                .el-upload__text
                    | 將圖片拖曳到此處，或
                    em 點擊上傳
                .el-upload__tip(slot='tip') 只能上傳jpg/png的圖片格式，且不超過500kb
        el-form-item(label='商品名稱', :label-width='formLabelWidth')
            el-input(v-model='addProduct.name', auto-complete='off')
        el-form-item(label='商品價格', :label-width='formLabelWidth')
            el-input(v-model='addProduct.price', auto-complete='off' type='number')
        el-form-item(label='商品上架', :label-width='formLabelWidth')
            el-switch(v-model='addProduct.auth', on-text='', off-text='', on-color='#13ce66')
    .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false') 取消
        el-button(v-if="dialogStatus=='create'" type='primary', @click='add') 確定
        el-button(v-else type='primary', @click='update') 確定
    // pre {{ this.addProduct}}
</template>

<script>
export default {
    data() {
        return {
            products: [],
            dialogFormVisible: false,
            dialogStatus: '',
            addProduct: {
                name: '',
                price: '',
                image: '',
                edit: false,
                auth: true,
                score: 0,
                create_at: new Date().toJSON().slice(0,10).replace(/-/g,'/')
            },
            formLabelWidth: '120px',
            imageUrl: ''
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/products').then(response => {
            console.log(response.data)
            this.products = response.data
        })
    },
    methods: {
        handleAdd () {
            this.resetTemp()
            this.dialogStatus = 'create';
            this.dialogFormVisible = true
        },
        add () {
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '創建成功',
                type: 'success',
                duration: 2000
            })
            this.axios.post('http://localhost:3000/products', this.addProduct).then(response => {
                // console.log(response.data)
            })
        },
        handleUpdate (index, rows) {
            this.dialogFormVisible = true
            this.addProduct.id = rows[index].id
            this.addProduct.name = rows[index].name
            this.addProduct.price = rows[index].price
            this.addProduct.image = rows[index].image
            this.addProduct.score = rows[index].score
            this.addProduct.auth = rows[index].auth
        },
        update () {
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '編輯成功',
                type: 'success',
                duration: 2000
            })
            this.axios.patch('http://localhost:3000/products/' + this.addProduct.id, this.addProduct).then(response => {
                // console.log(this.addProduct.id)
            })    
        },
        resetTemp () {
            this.userTemp = {
                name: '',
                image: '',
                mail: '',
                phone: '',
                tag: '公司',
                edit: false,
                auth: true,
                create_at: new Date().toJSON().slice(0,10).replace(/-/g,'/')
            }
        },
        save () {   
            this.$notify({
                // title: '儲存成功',
                message: '儲存成功',
                type: 'success'
            });
        },
        handleDelete (index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                rows.splice(index, 1)
                // this.axios.delete('http://localhost:3000/products/' + rows[index].id, rows.splice(index, 1)).then(response => {
                // // console.log(response.data)
                // })
                
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
        handleImageSuccess () {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl)
        },
        handleCurrentChange () {
            
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
