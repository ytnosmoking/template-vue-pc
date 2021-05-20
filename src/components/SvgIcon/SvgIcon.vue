<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    svgName() {
      return `#icon-${this.iconName}`
    },
    svgClass() {
      return `svg-icon ${this.iconClass}`
      // if (this.className) {
      //   return 'svg-icon ' + this.iconClass
      // } else {
      //   // eslint-disable-next-line
      //   return "svg-icon";
      // }
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
