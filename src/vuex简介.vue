<template>
  <div>
    <!-- <router-view></router-view> -->
    <h2>{{ count }}</h2>
    <h1>{{ $store.state.count }}</h1>
    <button @click="SET_COUNT">点击++</button>
    <h1>count的十倍:{{ bigNum }}</h1>
  </div>
</template>

<script>
// mapState 将vue里面的state映射到computed
// 使用
// 引入mapState  函数，返回一个对象
// 参数 ['映射的属性']
// mapGetters-->将vuex里面getters映射到computed
// mapMutations-->将vuex的mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState()) /* 空队象 */
console.log(mapState(['count']))
// postcss
// 声明一个变量，放到vuex
export default {
  created() {
    console.log(this.$store.state.count)
  },
  methods: {
    // add() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>
<style>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>
