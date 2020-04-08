<template>
  <section>
    <div>
      <div class="navtitle">车秒贷</div>
      <div class="tablelist">
        <el-row >
          <div  style="float:left">
          <el-menu
            style="width:150px"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
      
            router
          >
            <el-menu-item index="/ceshi">
              <i class="el-icon-menu"></i>
              <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
          </div>
         <div  style="float:left;margin-left:5px;width:80%">
          <router-view />
          </div>
          

          
        </el-row>
      
        
      </div>
    </div>
  </section>
</template>
<script>
export default {

  

}
</script>
<style>
</style>
<style lang="sass" scoped>
.navtitle
  color: #4a4a4a
  font-size: 18px
  text-indent: 20px
  font-weight: 500
  position: fixed
  width: 100%
  height: 56px
  line-height: 56px
  background-color: #fff
  z-index: 100
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15)
  left: 0
  top: 0
  min-width: 1200px
.tablelist
  margin-top: 70px
  
</style>

