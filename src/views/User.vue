<template lang="pug">
.table
  .crumbs
    el-breadcrumb(separator='/')
      el-breadcrumb-item
        i.fa.fa-home
        |  Dashboard
      el-breadcrumb-item 人員管理
      .top-option
        // el-button(type='success' size='large' icon='check' @click="update") 儲存
        el-button(type='info' size='large' icon='plus' @click="handleAdd") 新增
  el-table(:data='users', border='', style='width: 100%')
    el-table-column(label='序號', width='120')
      template(scope='scope')
        span {{ scope.row.id }}
    el-table-column(prop='create_at', label='註冊日期', sortable='', width='180')
        template(scope="scope")
            el-icon(name="time")
            span(style="margin-left: 10px") {{ scope.row.create_at }}
    el-table-column(label='大頭貼', width='200', align='center')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='email', v-model='scope.row.image')
        .cover(v-show='!scope.row.edit', :style="{ 'background-image': `url(${scope.row.image})`}")
    el-table-column(label='姓名', width='180')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', v-model='scope.row.name')
        span(v-show='!scope.row.edit') {{ scope.row.name }}
        el-tag(v-if='scope.row.auth==true' type="success") 授權
        el-tag(v-else type="danger") 停權
    el-table-column(label='信箱')
      template(scope='scope')
        span(v-show='!scope.row.edit') {{ scope.row.mail }}
    // el-table-column(label='折扣', width='120')
    //   template(scope='scope')
    //     el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
    //     span(v-show='!scope.row.edit') {{ scope.row.discount }}
    el-table-column(label='電話', width='180')
      template(scope='scope')
        el-input(v-show='scope.row.edit', size='small', type='number', v-model='scope.row.price')
        span(v-show='!scope.row.edit') {{ scope.row.phone }}
    el-table-column(align='center', label='操作', width='300')
      template(scope='scope')
        el-button(v-show='!scope.row.edit', type='primary', @click='handleUpdate(scope.$index, users)', size='', icon='edit') 編輯
        el-button(v-show='scope.row.edit', type='success', @click='scope.row.edit=false', size='', icon='check') 完成
        el-button(size='', icon='delete', type='danger', @click='handleDelete(scope.$index, users)') 刪除
  .pagination
    el-pagination(@current-change='handleCurrentChange', layout='prev, pager, next', :total='100')
    // pre {{ users }}
  el-dialog(title='人員資料', :visible.sync='dialogFormVisible')
    el-form(:model='userTemp')
        el-form-item(label='大頭貼', :label-width='formLabelWidth')
            el-upload.upload-demo(drag='', action='https://httpbin.org/post', multiple='' :on-success="handleImageSuccess")
                img(v-if="imageUrl" :src="imageUrl" class="avatar")
                i.el-icon-upload
                .el-upload__text
                    | 將圖片拖曳到此處，或
                    em 點擊上傳
                .el-upload__tip(slot='tip') 只能上傳jpg/png的圖片格式，且不超過500kb
        el-form-item(label='姓名', :label-width='formLabelWidth' maxlength='10')
            el-input(v-model='userTemp.name', auto-complete='off')
        el-form-item(label='信箱', :label-width='formLabelWidth')
            el-input(v-model='userTemp.mail', auto-complete='off' type='email')
        el-form-item(label='電話', :label-width='formLabelWidth')
            el-input(v-model='userTemp.phone', auto-complete='off' type='phone' maxlength='12')
        el-form-item(label='權限', :label-width='formLabelWidth')
            el-switch(v-model='userTemp.auth', on-text='', off-text='', on-color='#13ce66')
    .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false') 取消
        el-button(v-if="dialogStatus=='create'" type='primary', @click='add') 確定
        el-button(v-else type='primary', @click='update') 確定
    // pre {{ this.userTemp}}
</template>

<script>
export default {
    data() {
        return {
            users: [],
            dialogFormVisible: false,
            dialogStatus: '',

            userTemp: {
                name: '',
                image: '',
                mail: '',
                phone: '',
                tag: '公司',
                edit: false,
                auth: true,
                create_at: new Date().toJSON().slice(0,10).replace(/-/g,'/')
            },
            formLabelWidth: '120px',
            imageUrl: ''
        }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.axios.get('http://localhost:3000/users').then(response => {
          console.log(response.data)
          this.users = response.data
        })
      },
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
          this.axios.post('http://localhost:3000/users', this.userTemp).then(response => {
              // console.log(response.data)
              this.getData()
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
      handleUpdate (index, rows) {
          this.dialogFormVisible = true
          this.userTemp.id = rows[index].id
          this.userTemp.name = rows[index].name
          this.userTemp.image = rows[index].image
          this.userTemp.mail = rows[index].mail
          this.userTemp.phone = rows[index].phone
          this.userTemp.auth = rows[index].auth
      },
      update () {
          this.dialogFormVisible = false
          this.$notify({
              title: '成功',
              message: '編輯成功',
              type: 'success',
              duration: 2000
          })
          this.axios.patch('http://localhost:3000/users/' + this.userTemp.id, this.userTemp).then(response => {
              // console.log(this.userTemp.id)
              this.getData()
          })
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
              // this.axios.delete('http://localhost:3000/users/' + rows[index].id, rows.splice(index, 1)).then(response => {
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

<style scoped>
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

.el-tag {
    margin-left: 1rem
}
</style>
