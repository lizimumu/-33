<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load 触底的时候触发load事件 -->
    <!-- offset 滚动条和底部距离多少的时候触发load事件，默认是300px -->
    <!-- immediate-check 初渲染的时候是否执行load事件 -->
    <!-- finished:Boolean load事件被触发 true 事件不会被触发 并且显示 finished-text的文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle"
      ><van-list
        @load="getNextPageArticle"
        v-model="loading"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，请重新刷新"
      >
        <Article-Item
          v-for="item in articles"
          :key="item.id"
          :article="item"
        ></Article-Item></van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './/Airticleitem.vue'
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
export default {
  name: 'Articlelist',
  data() {
    return {
      finished: false,
      loading: false,
      preTimestamp: '',
      articles: [],
      error: false,
      refreshLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  created() {
    this.getFrist()
  },
  methods: {
    async getFrist() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (e) {
        // js错误，上泡、
        const status = e.response?.status
        if (!e.response || status === 507) {
          throw e
        } else {
          if (status === 400) {
            throw new Error(e.results.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放到最后
        // 如果是下拉刷新 ，把数据放到最前
        // this.loading是true说明触发了下滑刷新，
        // this.loading是false 说明触发了下拉刷新
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // this.articles.push(...data.data.results)
        this.preTimestamp = data.data.pre_timestamp

        console.log(666)
      } catch (error) {
        this.error = true
      } finally {
        // finally  不管是try 还是cath都会进finally
        // 结束后都改为false下次才能触发
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子自己的滚动条
// 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // & 代表当前元素他爹
  // :: -webkit-scrollbar 滚动槽
  // :: -webkit-scrollbar-thumb 滚动的滑块
  // 可以修改滚动条的样式
  &::-webkit-scrollbar {
    width: 10px;
    background-color: pink;
  }
  &::-webkit-scrollbar-thumb {
    background-color: green;
    background-repeat: 10px;
  }
}
</style>
