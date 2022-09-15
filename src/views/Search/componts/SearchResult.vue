<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      error-text="请求失败点击重新加载"
      :error.sync="error"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell
    ></van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
// 用van-list 把内容包起来
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  created() {},
  methods: {
    async getResults() {
      try {
        // 测试代码
        if (Math.random() < 0.2) {
          throw this.error
        }
        console.log(888)
        const { data } = await getResultAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch {
        // 错误触发
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
