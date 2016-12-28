<template>
    <div class="block">
        <el-date-picker v-model="value" type="daterange" placeholder="选择日期范围" style="width: 220px">
        </el-date-picker>
    </div>
</template>


<script>
    export default {
        name: 'WmData',
        data() {
            return {
                props:['value'],
                methods:{
                    onChange( value ){
                        this.$emit("onChange", value);
                    }
                }

            };
        }
    };
</script>
