<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="fa fa-home"></i> Dashboard</el-breadcrumb-item>
                <el-breadcrumb-item>人員管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="products" border style="width: 100%">
            <el-table-column label="#" width="120">
                <template scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="上架日期" sortable width="180">
            </el-table-column>
            <el-table-column label="商品名稱" width="180">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="折扣">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" type="email" v-model="scope.row.cover"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.cover }}</span>
                </template>
            </el-table-column>
            <el-table-column label="售價" width="230">
                <template scope="scope">
                    <el-input v-show="scope.row.edit" size="small" type="number" v-model="scope.row.price"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column label="狀態" width="120">
                <template scope="scope">
                    <el-switch v-model="scope.row.auth" on-text="" off-text="" on-color="#13ce66">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300">
                <template scope="scope">
                <!--
                    <el-button v-show="!scope.row.edit" size="" icon="edit" type="primary" @click="edit(scope.$index, products)">編輯</el-button>
                    <el-button v-show="scope.row.edit" size="" icon="check" type="success" @click="save(scope.$index, products)">完成</el-button>
                -->
                    <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="" icon="edit">编辑</el-button>
                    <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="" icon="check">完成</el-button>

                    <el-button size="" icon="delete" type="danger" @click="handleDelete(scope.$index, products)">刪除</el-button>
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
</style>
