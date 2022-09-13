<template>
  <div class="channel-edit">
    <!-- 我的频道 -->

    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="mini"
        class="btn"
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成 ' : ' 编辑' }}
      </van-button>
    </van-cell>

    <!-- 频道 -->

    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name === '推荐' }"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 频道 -->

    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'

// 所有频道减去我的频道等于推荐频道
export default {
  name: 'myChannels',
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelAPI()
      console.log(data)
      this.allChannels = data.data.channels
      console.log(this.allChannels)
    },
    handleMyChannel({ name }, index) {
      // console.log(66)
      // 如果isEdit是true 并且 name不是推荐
      if (this.isEdit && name !== '推荐') {
        console.log('删除', name)
      } else {
        console.log(888)
        // 1.关闭弹窗
        // 2.切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelItem) => {
        return !this.myChannels.find(
          (myChannelsItem) => myChannelsItem.id === allChannelItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
  :deep(.btn) {
    width: 100px;
    font-size: 25px;
  }
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
