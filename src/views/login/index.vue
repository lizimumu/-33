<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-cell-group inset>
        <!-- 表单 -->
        <!-- van-field:输入框，text,password 文本 -->
        <!-- v-model 用户输入的值 -->
        <!-- 表示表单项 -->
        <!-- rules是一个数组 -->
        <!-- rule:(required:是否必选，message:错误的提示信息，pattern:正则，trigger:规则的触发时机onChange、onBlur-->
        <van-field
          v-model="mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="moblieRules"
        >
          <!-- 字体图标 -->
          <template #label>
            <span class="toutiao toutiao-shouji"></span>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          placeholder="请输入密码密码"
          :rules="codeRules"
        >
          <!-- 字体图标 -->
          <template #label>
            <span class="toutiao toutiao-yanzhengma"></span>
          </template>
          <!-- 验证码 -->
          <template #button
            ><van-button
              block
              type="default"
              size="small"
              round
              native-type="button"
              class="btn"
              v-if="isShowCodeBtn"
              @click="sendCode"
            >
              获取验证码</van-button
            >
            <!-- 用v-if 定义变量判断点击倒计时显示倒计时结束获取验证码显示 -->
            <van-count-down
              v-else
              :time="1000 * 6"
              format="ss s"
              @finish="isShowCodeBtn = true"
            /> </template
        ></van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { moblieRules, codeRules } from '../login/routr'
// 引入api
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      moblieRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // 正则效验成功后才会触发
    async onSubmit() {
      // loading
      // message ；提示文案
      // forbiddenClick 禁止点击
      // duration 展示的时长 为0 一直展示

      try {
        const { data } = await login(this.mobile, this.code)
        // 登录的时候把touken存到vuex
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        console.log(data)
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错2.axios封装的error对象
        // axios封装的error对象
        // 11 - error,response.data后端返回的数据 / -error.response.status后端返回的状态码
        // 如果是 后端请求的错误提示用户 错误的信息 比如手机号格式
        console.log(error)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // js 导致的错误 2 507
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中',
        forbiddenClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 1.发送请求
      // 2. 验证输入的手机号是不是合格
      // form 绑定ref='form'
      // $ref.form.validate()
      await this.$refs.form.validate('mobile')
      console.log('发送请求')
      this.loading()
      // 1.发送请求
      // 发送验证码判断
      try {
        await sendCodeAPI(this.mobile)
        // 显示倒计时组件
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
