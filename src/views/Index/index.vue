<template>
  <div>
    this is Index Vue123
    <svg-icon iconName="director" iconClass="big"></svg-icon>123
    <div @click="get">getData</div>
    <div @click="post">postData</div>
  </div>
</template>
<script>
import { getData, postData } from 'utils/service'
export default {
  name: 'ViewIndex',
  data() {
    return {};
  },
  mounted() {},
  methods: {
    get() {
      getData('/get', { a: 1, b: 2 })
    },
    post() {
      postData('/post', {
        data: { c: 1 },
        params: { dd: 123 }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.big {
  font-size: 30px;
}
</style>
