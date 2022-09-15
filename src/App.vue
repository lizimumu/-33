<template>
  <div>
    <!-- 右滑进入 -->
    <!-- out-in先出后入 in-out 先入后出 -->
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>
<style>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>
