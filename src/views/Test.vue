<template>
    <section >
        <el-table :data="tableData" border style="width: 100%" >
              <el-table-column fixed prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="province" label="省份"></el-table-column>
              <el-table-column prop="city" label="市区"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="zip" label="邮编"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
    </section>
</template>
<script >
export default {
  name: 'app',
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    tabclick(tab, enent) {
      console.log(tab);
      console.log(enent);
    },
    handleClick() {
        this.$router.push('ceshi1')
      
    }
  }
}
</script>
<style lang="sass" scoped>

</style>

