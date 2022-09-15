<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      icon="search"
      :key="index"
      @click="$emit('change-keywords', Suggestions[index])"
      ><template> <span v-html="item"></span> </template
    ></van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符：决定渲染SearchSuggestion
// map
// · 返回新数组，长度和原数组一致，函数的返回值新数组那一项的值
// 动态正则
// -/Anglar,/ig字面量形式的正则，不能动态生成正则的内容
// -new RegExp(字符串/变量，修饰符'ig')regular expression
// 字符串的replace
// -字符串.replace(正则，函数)
// -这个函数参数match,匹配上的结果，函数的返回值回作为替换的结果
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return { Suggestions: [] }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {},
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        console.log(data)
        this.Suggestions = data.data.options.filter(Boolean)
      } catch (e) {
        if (e.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw e
        }
      }
    }, 1000)
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.Suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  }
}
</script>

<style></style>
