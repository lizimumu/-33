<template>
  <div><router-view></router-view></div>
</template>

<script>
// 1.rem 适配
// 盒子使用rem
// 2.自动识别css中的px 并将转成rem
// postcss
export default {}
</script>
<style>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>
