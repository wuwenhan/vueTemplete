<template>
  <div class="principal">
    <h3>结构化还款</h3>
    <el-tabs v-model="activejin"  @tab-click="handleClick">
      <el-tab-pane label="还款计划" name="huankuan">
        <tablelist :inputCol="inputCol" :strUrl="strUrl" />
      </el-tab-pane>
      <el-tab-pane label="收入计划" name="shouru">
        <tablelist :inputCol="srinputCol" :strUrl="srStrUrl" />
      </el-tab-pane>
      <el-tab-pane label="贴息摊销计划" name="tiexi">
        <tablelist :inputCol="tsinputCol" :strUrl="tsStrUrl" />
      </el-tab-pane>
      <el-tab-pane label="佣金计划" name="yongjin">
        <tablelist :inputCol="yjinputCol" :strUrl="yjStrUrl" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tablelist from "@/components/tablelist.vue";
export default {
  components: {
    tablelist
  },
  data() {
    return {
      inputCol: {
        loanmoney: "贷款金额",
        monthcount: "贷款期数",
        rate: "客户利率",
        structuredMonth: "结构化还款期数",
        structuredType:"结构化还款类型",
        structuredMoney: "结构化还款前N期月供"
      },

      srinputCol: {
        loanmoney: "贷款金额",
        monthcount: "贷款期数",
        rate: "客户利率",
        activedate: "激活时间",
        structuredMonth: "结构化还款期数",
        structuredType:"结构化还款类型",
        structuredMoney: "结构化还款前N期月供",
      },

      tsinputCol: {
        loanmoney: "贷款金额",
        monthcount: "贷款期数",
        actualrate: "实际利率",
        rate: "客户利率",
        structuredMonth: "结构化还款期数",
        structuredType:"结构化还款类型",
        structuredMoney: "结构化还款前N期月供",
        activedate: "激活时间"
      },
      yjinputCol: {
        loanmoney: "贷款金额",
        monthcount: "贷款期数",
        rate: "客户利率",
        actualrate: "实际利率",
        commission: "佣金",
        activedate: "激活时间",
        structuredMonth: "结构化还款期数",
        structuredType:"结构化还款类型",
        structuredMoney: "结构化还款前N期月供",
      },
      strUrl: "/jiegouhua/hkjj?",
      srStrUrl: "/jiegouhua/syjj?",
      tsStrUrl: "/jiegouhua/txjj?",
      yjStrUrl: "/jiegouhua/yjjj?",
      activejin: "huankuan"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>