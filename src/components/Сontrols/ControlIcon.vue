<template>
  <div
    @click="$emit('click')"
    class="control-icon"
    :class="{ 'control-icon--active': active }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.control-icon {
  border-radius: $icon-radius;
  background-color: #000;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  font-size: 16px;
  text-align: center;
  align-items: center;
  height: 34px;
  min-width: 34px;
  padding: 0 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #000;
  &:hover {
    background-color: rgba(0, 0, 0, 0.87);
  }
  &:not(:last-child) {
    margin-right: 6px;
  }

  &--active {
    box-shadow: 0 0 2px 2px inset #fff;
  }
}
</style>
