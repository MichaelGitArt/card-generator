<template>
  <div class="a-select-wrap no-select" ref="wrap">
    {{ label }}
    <div
      @click="toggle"
      class="a-select"
      type="text"
      :placeholder="placeholder"
    >
      <span class="a-select__value" v-if="activeItem">{{
        activeItem.name
      }}</span>
      <control-icons>
        <control-icon class="a-select__arrow" />
      </control-icons>
    </div>
    <div class="a-select-dropdown" v-if="opened">
      <div
        class="a-select-dropdown__item"
        :class="{
          'a-select-dropdown__item--active':
            activeItem && activeItem.id === item.id,
        }"
        v-for="item in items"
        :key="item.id"
        @click="choose(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import ControlIcons from "./ControlIcons";
import ControlIcon from "./ControlIcon";

export default {
  components: {
    ControlIcons,
    ControlIcon,
  },
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
    items: Array,
    value: {
      type: Number,
      default: -1,
    },
  },
  data: () => ({
    opened: false,
  }),
  mounted() {
    document.addEventListener("click", this.mountOuterClick, true);
    this.init();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.mountOuterClick, true);
  },
  methods: {
    choose(id) {
      this.$emit("input", id);
      this.close();
    },
    init() {
      if (!this.allowEmpty && this.value === -1) {
        this.$emit("input", this.items[0].id);
      }
    },
    close() {
      this.opened = false;
    },
    toggle() {
      this.opened = !this.opened;
    },
    mountOuterClick(event) {
      if (
        event.target === this.$refs.wrap ||
        this.$refs.wrap.contains(event.target)
      ) {
        return;
      }
      this.close();
    },
  },
  computed: {
    activeItem() {
      if (this.value === -1) return;
      return this.items.find((item) => item.id === this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.a-select-wrap {
  font-size: 1.1em;
  display: inline-flex;
  flex-direction: column;
  position: relative;
}
.a-select {
  @include input-border;
  font-size: 1em;
  height: 56px;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 6px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  &__arrow {
    background-image: url("../../assets/icons/arrow-down.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 24px;
  }
  &__value {
    flex-grow: 1;
  }
}
.a-select-dropdown {
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  z-index: 100;
  @include input-border;
  border-top: none;
  background-color: #fff;
  max-height: 130px;
  overflow: auto;
  @include custom-scroll;
  &__item {
    transition: all 0.2s;
    cursor: pointer;
    &:hover,
    &--active {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
}
</style>
