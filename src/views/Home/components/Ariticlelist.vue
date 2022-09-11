<template>
  <div>
    <Airticle-Item
      v-for="item in articles"
      :key="item.id"
      :article="item"
    ></Airticle-Item>
  </div>
</template>

<script>
import AirticleItem from './/Airticleitem.vue'
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
export default {
  name: 'Articlelist',
  data() {
    return {
      articles: []
    }
  },
  components: {
    AirticleItem
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
        console.log(data)
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
    }
  }
}
</script>

<style></style>
