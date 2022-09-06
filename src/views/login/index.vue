<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="from">
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
          :rules="[
            { required: true, message: '请填写手机号' },
            {
              pattern:
                /^(0|86|17951)?(13[0-9]|15[0123456789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '手机格式错误'
            }
          ]"
        >
          <template #label>
            <span class="toutiao toutiao-shouji"></span>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          placeholder="请输入密码密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: /[0-9]{6}/,
              message: '验证码格式错误'
            }
          ]"
        >
          <template #label>
            <span class="toutiao toutiao-yanzhengma"></span> </template
        ></van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit() {}
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
</style>
