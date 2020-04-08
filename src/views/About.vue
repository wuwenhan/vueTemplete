<template>
  <div class="about">
    <template>
      <el-header>贷款计算器</el-header>
      <el-tabs
        :tab-position="tabPosition"
        type="border-card"
        style="min-height:800px"
        class="siderTab"
      >
        <el-tab-pane label="等额本息">
          <equalInterest />
        </el-tab-pane>
        <el-tab-pane label="等额本金">
          <equalPrincipal />
        </el-tab-pane>
        <el-tab-pane label="结构化还款">
          <structuredRepayment />
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
import equalInterest from "@/views/equal/equalInterest.vue";
import equalPrincipal from "@/views/equal/equalPrincipal.vue";
import structuredRepayment from "@/views/equal/structuredRepayment.vue";
export default {
  components: {
    equalInterest,
    equalPrincipal,
    structuredRepayment
  },
  data() {
    return {
      tabPosition: "left"
    };
  }
};
</script>
<style lang="sass">
.el-tabs__nav-prev
  display: none!important
.el-tabs__nav-next
  display: none!important
.el-tabs--border-card
  border: none!important
  box-shadow: none!important
</style>
<style lang="sass" scoped>
.el-header
  font-weight: bold
  background-color: #B3C0D1
  color: initial
  text-align: center
  line-height: 60px
</style>

