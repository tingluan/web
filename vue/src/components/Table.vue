<template>
    <div class='table-wrapper'>
        <el-table border :data="source">
            <slot></slot>
        </el-table>

        <el-pagination
            ref="pagination"
            class="mt30 text-center"
            layout="prev, pager, next,jumper"
            @current-change="onPagination"
            :current-page="pageNo"
            :page-size="pageSize"
            :total="total" v-if="enableDisplay">
        </el-pagination>
    </div>


</template>


<script>
    export default {
        name: 'WmTable',
        props: {
            source: Array,
            pageNo: {
                type: Number,
                default: 1
            },

            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            },
            mode: {
                type: String,
                default: "multiple"
            },
            enableDisplay:{
                default:true,
                type:Boolean
            }
        },

        methods: {
            onPagination(pageNo){
                this.$emit("onPagination", pageNo);
            }
        },
    }
</script>

<style>
    .table-wrapper{
        clear:both;
    }
</style>
