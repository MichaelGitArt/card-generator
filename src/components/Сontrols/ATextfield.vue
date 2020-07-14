<template>
  <div class="a-textfield-wrap">
    {{ label }}
    <div class="a-textfield">
      <input
        class="a-textfield__input"
        type="text"
        :placeholder="placeholder"
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
      console.log("id", id);
      this.option = id;
      this.$emit("choose", id);
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
    @include placeholder(rgba(0, 0, 0, 0.25));
  }
}
</style>
