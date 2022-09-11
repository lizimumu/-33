<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 导航区 -->
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/ " icon="home-o">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template></van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/video"
        ><template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="text">视频</span></template
        ></van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/wenda"
        ><template #icon>
          <span class="toutiao toutiao-wenda"></span
          ><span class="text">问答</span></template
        ></van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/profile"
        ><template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="text">{{ isLogin ? '我的' : '未登录' }}</span></template
        ></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    height: 100%;
    // 改变轴向
    flex-direction: column;
    // 居中
    align-items: center;
    justify-content: space-evenly;
  }
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 30px;
  }
}
</style>
