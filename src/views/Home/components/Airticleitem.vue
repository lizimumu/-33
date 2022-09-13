<template>
  <div>
    <!-- 没有图片的结构 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <!-- 一张图片的结构 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image
        width="100"
        height="100"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三张图片的结构 -->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          width="100"
          height="100"
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论， ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
