<template>
  <div class="a-textfield-wrap">
    {{ label }}
    <div class="a-textfield">
      <input
        class="a-textfield__input"
        :class="{ 'a-textfield__input--centered': this.centered }"
        type="text"
        :placeholder="placeholder || (activeOption && activeOption.placeholder)"
        :value="value"
        @change="$emit('input', $event.target.value)"
      />

      <control-icons v-if="options" static>
        <control-icon
          v-for="item in options"
          :key="item.id"
          @click="choose(item.id)"
          :active="item.id === option"
          >{{ item.name }}</control-icon
        >
      </control-icons>
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
    options: Array,
    value: String,
    centered: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    option: -1,
  }),
  mounted() {
    if (this.options) {
      this.choose(this.options[0].id);
    }
  },
  methods: {
    choose(id) {
      this.option = id;
      this.$emit("changeOption", id);
    },
  },
  computed: {
    activeOption() {
      if (!this.options || this.option === -1) return null;
      return this.options.find((option) => option.id === this.option);
    },
  },
};
</script>

<style scoped lang="scss">
.a-textfield-wrap {
  font-size: 1.3em;
  display: inline-flex;
  flex-direction: column;
  position: relative;
}

.a-textfield {
  display: flex;
  align-items: center;
  @include input-border;
  &__input {
    font-size: 1em;
    padding: 0 5px;
    border: none;
    height: 56px;
    min-width: 0;
    width: auto;
    flex-grow: 1;
    position: relative;
    z-index: 4;
    @include placeholder(rgba(0, 0, 0, 0.25));
    &--centered {
      text-align: center;
    }
  }
}
</style>
