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
        <Articlelist :id="item.id"></Articlelist>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      v-model="isShow"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      ><channel-edit
        v-if="isShow"
        :myChannels="channel"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-chanel="delChannel"
        @add-channel="addChannel"
      ></channel-edit>
      <!-- 自定义事件传参子级把对应点击得index传过来并且触发自定义事件，父级让弹出框关闭，并且当前高亮的索引等于传过来的索引 -->
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ChannelEdit from './components/ChannelEdit'
import Articlelist from './components/Ariticlelist'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
      active: 0,
      channel: []
    }
  },
  components: {
    Articlelist,
    ChannelEdit
  },
  created() {
    this.initChannel()
    console.log(this.isLogin)
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNEL']),
    // 1.?? 相当于 || 或
    // 2.? 可选连操作符 ？前面是unfined 那么就不会取值
    // 封装函数获取数据
    initChannel() {
      // !1.判断如果你登录了
      // ! channel应该是请求获取自己的频道数据
      if (this.isLogin) {
        this.getChannel()
      } else {
        // !2.如果未登录 。首先判断本地有没有数据 如果有 用本地数据，如果没有发起请求获取默认频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channel = myChannels
        }
      }
    },
    async delChannel(id) {
      // 1.视图层删除频道
      // !绑定自定义事件父组件里面子组件点击需要删除的时候把对应的id 传过来 父组件里面进项筛选把不是传递过来的筛选成新的数组重新赋值给this.channel

      // 2.发送请求删除频道
      try {
        const newChannel = (this.channel = this.channel.filter(
          (item) => item.id !== id
        ))
        // !先进项数据库删除，然后在进行试图删除 如果没登录则提示用户登录在删除
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // ? 筛选删除数据后 存储到本地 未登录时使用渲染页面
        }
        this.SET_MY_CHANNEL(newChannel)
        this.channel = newChannel
        this.$toast('删除频道成功~')
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.$toast.fail('请登录在进行删除')
        }
      }
    },
    async addChannel(chanel) {
      try {
        // !发起请求传值 把要添加的id传递和要添加的位置索引传递过去 刚好是我们获取过来数据的length
        if (this.isLogin) {
          const { data } = await addChannelAPI(chanel.id, this.channel.length)
          console.log(data)
        } else {
          // !添加后存到本地存贮 未登录时使用 渲染页面
          this.SET_MY_CHANNEL([...this.channel, chanel])
        }

        this.channel.push(chanel)
        this.$toast('添加频道成功~')
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.$toast.fail('请登录在进行添加')
        }
      }
    },
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
