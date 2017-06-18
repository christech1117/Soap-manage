<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 消息管理
      .top-option
        // el-button(type='success' size='large' icon='check' @click="update") 儲存
        el-button(type='info' size='large' icon='plus' @click="handleAdd") 新增
  el-table(:data='news', border='', style='width: 100%')
    el-table-column(label='#', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='create_at', label='發佈日期', sortable='', width='180')
    el-table-column(label='新聞圖片', width='200', align='center')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='email', v-model='scope.row.image')
        .cover(v-show='!scope.row.edit', :style="{ 'background-image': `url(${scope.row.image})`}")
    el-table-column(label='新聞標題')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.name')
        span(v-show='!scope.row.edit') {{ scope.row.title }}
    el-table-column(label='發佈', width='120')
      template(scope='scope')
        el-switch(v-model='scope.row.auth', on-text='發佈', off-text='草稿', on-color='#13ce66')
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='handleUpdate(scope.$index, news)', size='', icon='edit') 編輯
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, news)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')
    // pre {{ news }}

  el-dialog(title='新聞資料', :visible.sync='dialogFormVisible')
    el-form(:model='newsTemp')
        el-form-item(label='新聞圖片', :label-width='formLabelWidth')
            el-upload.upload-demo(drag='', action='https://httpbin.org/post', multiple='' :on-success="handleImageSuccess")
                img(v-if="imageUrl" :src="imageUrl" class="avatar")
                i.el-icon-upload
                .el-upload__text
                    | 將圖片拖曳到此處，或
                    em 點擊上傳
                .el-upload__tip(slot='tip') 只能上傳jpg/png的圖片格式，且不超過500kb
        el-form-item(label='新聞標題', :label-width='formLabelWidth')
            el-input(v-model='newsTemp.title', auto-complete='off')
        el-form-item(label='新聞內容', :label-width='formLabelWidth')
            el-input(v-model='newsTemp.description', auto-complete='off' type="textarea" rows="15")
        el-form-item(label='發佈狀態', :label-width='formLabelWidth')
            el-switch(v-model='newsTemp.auth', on-text='', off-text='', on-color='#13ce66')
    .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false') 取消
        el-button(v-if="dialogStatus=='create'" type='primary', @click='add') 確定
        el-button(v-else type='primary', @click='update') 確定
    // pre {{ this.newsTemp}}
</template>

<script>
export default {
    data() {
        return {
            news: [],
            dialogFormVisible: false,
            dialogStatus: '',
            newsTemp: {
                title: '',
                image: '',
                description: '',
                edit: false,
                auth: true,
                create_at: new Date().toJSON().slice(0,10).replace(/-/g,'/')
            },
            formLabelWidth: '120px',
            imageUrl: ''
        }
    },
    mounted () {
        this.axios.get('http://localhost:3000/news').then(response => {
            console.log(response.data)
            this.news = response.data
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
            this.axios.post('http://localhost:3000/news', this.newsTemp).then(response => {
                // console.log(response.data)
            })
        },
        handleUpdate (index, rows) {
            this.dialogFormVisible = true
            this.newsTemp.id = rows[index].id
            this.newsTemp.title = rows[index].title
            this.newsTemp.image = rows[index].image
            this.newsTemp.description = rows[index].description
            this.newsTemp.auth = rows[index].auth
        },
        update () {
            this.dialogFormVisible = false
            this.$notify({
                title: '成功',
                message: '編輯成功',
                type: 'success',
                duration: 2000
            })
            this.axios.patch('http://localhost:3000/news/' + this.newsTemp.id, this.newsTemp).then(response => {
                // console.log(this.newsTemp.id)
            })    
        },
        resetTemp () {
            this.userTemp = {
                title: '',
                image: '',
                description: ''
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
                // this.axios.delete('http://localhost:3000/news/' + rows[index].id, rows.splice(index, 1)).then(response => {
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
