<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3396fc"
        placeholder="请输入搜索关键词"
        show-action
        @search="onsearch"
        @focus="isShowSearchResults = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywords="keywords"
      :is="computedName"
      @change-keywords="onsearch"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchHistory from '../Search/componts/SearchHistory.vue'
import SearchResult from '../Search/componts/SearchResult.vue'
import SearchSuggestion from '../Search/componts/SearchSuggestion.vue'
export default {
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  computed: {
    ...mapState(['histories']),
    computedName() {
      // 搜索历史 搜索框为空
      // 搜索建议：搜索框有值
      // 收缩结果 触发搜索时
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },

  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onsearch(keywords) {
      // 巴keywords天进阿仔起米
      // 1.用户手动敲回车2.点击了搜索建议
      // 存储搜索历史
      // !去重:1.获取没有去重的数组 2.放在new Set(arr) 3. [...set] 转化成真数组
      const distincthistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distincthistories)
      this.isShowSearchResults = true
      this.keywords = keywords
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
