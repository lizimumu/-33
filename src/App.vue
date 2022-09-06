<template>
  <div class="toutiao toutiao-gengduo">
    黑马头条
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class='box'> </div>
  </div>

</template>

<script>
// 1.rem 适配
// 盒子使用rem
// 2.自动识别css中的px 并将转成rem
// postcss
export default {}
</script>
<style>
.box{
  width: 2rem;
  height: 2rem;
  background-color: pink;
}</style>
