<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="fa fa-home"></i> Dashboard</el-breadcrumb-item>
                <el-breadcrumb-item>人員管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="#" width="120">
                <template scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="註冊日期" sortable width="180">
            </el-table-column>
            <el-table-column label="姓名" width="180">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="信箱">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" type="email" v-model="scope.row.mail"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.mail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手機" width="230">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" type="phone" v-model="scope.row.phone"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="權限" width="120">
                <template scope="scope">
                    <el-switch v-model="scope.row.auth" on-text="" off-text="" on-color="#13ce66">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300">
                <template scope="scope">
                <!--
                    <el-button v-show="!scope.row.edit" size="" icon="edit" type="primary" @click="edit(scope.$index, tableData)">編輯</el-button>
                    <el-button v-show="scope.row.edit" size="" icon="check" type="success" @click="save(scope.$index, tableData)">完成</el-button>
                -->
                    <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="" icon="edit">编辑</el-button>
                    <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="" icon="check">完成</el-button>

                    <el-button size="" icon="delete" type="danger" @click="handleDelete(scope.$index, tableData)">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    date: '2016-05-02',
                    name: '劉秀',
                    mail: 'abcc456@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '家',
                    edit: false,
                    auth: true
                },
                {
                    id: 2,
                    date: '2016-05-04',
                    name: '陰麗華',
                    mail: 'abcc45678@gmail.com',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 3,
                    date: '2016-05-01',
                    name: '小寶寶',
                    mail: 'jasidjasi@gmail.com',
                    phone: '0920-123-456',
                    tag: '家',
                    edit: false,
                    auth: true
                },
                {
                    id: 4,
                    date: '2016-05-03',
                    name: '阿🐷',
                    mail: 'vmvmk@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 5,
                    date: '2016-05-03',
                    name: '鄧奉',
                    mail: 'feeling221@hotmail.com',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 6,
                    date: '2016-05-08',
                    name: '陰識',
                    mail: 'abcc456@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 7,
                    date: '2016-05-18',
                    name: '陰興',
                    mail: 'abcc456@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 8,
                    date: '2016-05-20',
                    name: '郭家',
                    mail: 'feeling221@gmail.com',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 9,
                    date: '2016-06-01',
                    name: '阿禹',
                    mail: 'abcc456@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 10,
                    date: '2016-06-03',
                    name: '劉伯升',
                    mail: '963vc745@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                },
                {
                    id: 11,
                    date: '2016-06-03',
                    name: '次元伯',
                    mail: 'Adsjkd1127@yahoo.com.tw',
                    phone: '0920-123-456',
                    tag: '公司',
                    edit: false,
                    auth: true
                }
            ]
        }
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
</style>
