<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar"
      ><template #title
        ><van-button icon="search" size="small" round block>搜索</van-button>
      </template></van-nav-bar
    >
    <!-- 频道和文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <articlelist :id="item.id"></articlelist>
      </van-tab>

      <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelAPI } from '@/api'
import Articlelist from './components/Ariticlelist'
export default {
  data() {
    return {
      active: 0,
      channel: []
    }
  },
  components: {
    Articlelist
  },
  created() {
    this.getChannel()
  },
  methods: {
    // 1.?? 相当于 || 或
    // 2.? 可选连操作符 ？前面是unfined 那么就不会取值
    // 封装函数获取数据
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        console.log(data)
        this.channel = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 ?? this.$toast.fail('服务异常请刷新')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
