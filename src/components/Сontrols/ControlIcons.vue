<template>
  <div class="control-icons" :class="{ 'control-icons--static': static }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    static: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.control-icons {
  display: flex;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(0, -50%);
  &--static {
    position: static;
    transform: none;
    margin-right: 7px;
  }
}
</style>
