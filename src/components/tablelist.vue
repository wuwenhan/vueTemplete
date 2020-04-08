<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item :label="formCol[index]" v-for="(item,index) in formInline" :key="index">
        <el-date-picker
          v-model="formInline[index]"
          type="datetime"
          v-if="index == 'activedate'"
          placeholder="选择日期时间"
        ></el-date-picker>
        <el-select
          v-model="formInline[index]"
          v-else-if="index == 'structuredType'"
          placeholder="结构化还款类型"
        >
          <el-option label="前N期不还款" value="0"></el-option>
          <el-option label="前N期还部分" value="2"></el-option>
        </el-select>
        <el-input v-model="formInline[index]" v-else></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(info,itemkey) in tableData[0]"
        :key="info.key"
        :prop="itemkey"
        :label="itemkey"
      ></el-table-column>
    </el-table>
  </section>
</template>

<script>
import Qs from "qs";
export default {
  props: {
    inputCol: Object,
    strUrl: String
  },
  data() {
    return {
      value1: "",
      formCol: {},
      formInline: {},
      tableData: []
    };
  },
  methods: {
    init() {
      const result = {};
      const obj = Object.keys(this.inputCol);
      for (const key in obj) {
        const value = obj[key];
        result[value] = "";
      }
      this.formCol = this.inputCol;
      this.formInline = result;
    },
    getList() {
      const url = this.strUrl + Qs.stringify(this.formInline);
      this.axios
        .get(url)
        .then(resp => {
          if (resp.data.success) {
            this.tableData = resp.data.data;
          } else {
            this.$message({
              message: resp.data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>