<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row> </van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userinfo.photo"
              />
              <span class="mobile">{{ userinfo.name }}</span></van-row
            >
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-button
                size="mini"
                round
                class="edit-btn"
                @click="$router.push('/user')"
                >编辑按钮</van-button
              ></van-row
            >
          </van-col>
        </van-row>
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>{{
                userinfo.art_count
              }}</template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>{{
                userinfo.fans_count
              }}</template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>{{
                userinfo.follow_count
              }}</template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>{{
                userinfo.like_count
              }}</template></van-grid-item
            >
          </van-grid></van-row
        >
      </div>
      <!--   未登录的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image round width="1.76rem" height="1.76rem" :src="moblieSrc" />
        <span class="text">登录 /注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item icon="photo-o" text="收藏"
          ><template #icon>
            <span class="toutiao toutiao-shoucang"></span></template
        ></van-grid-item>
        <van-grid-item icon="photo-o" text="历史"
          ><template #icon>
            <span class="toutiao toutiao-lishi"></span></template
        ></van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="单元格" value="消息通知" />
        <van-cell title="单元格" value="小智同学" />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moblieSrc from '@/assets/images/mobile.png'
// 引入Api
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      userinfo: {},
      moblieSrc
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })

      this.$store.commit('SET_TOKEN', {})
      // on close
    },
    // 封装函数发起请获取用户信息 判断有token才获取 没有直接return
    async getUserinfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userinfo = data.data
        console.log(data)
      } catch (error) {
        // error
        // 1.js 导致的 2.axios 导致的
        // js 和400,507给程序猿提示，401来进行用户提示，重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  background-color: #f6f7f9;
  height: 100vh;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}

.banner {
  width: 100%;
  height: 5.333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-left: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: transparent;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
