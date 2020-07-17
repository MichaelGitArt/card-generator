<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: String,
    light: {
      type: Boolean,
      default: false,
    },
  },
  render(r) {
    return r(
      this.tag,
      {
        class: {
          "a-btn": true,
          "a-btn--light": this.light,
        },
        on: {
          click: () => {
            this.$emit("click");
          },
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style scoped lang="scss">
.a-btn {
  color: white;
  background-color: black;
  border-radius: 15px;
  border: none;
  padding: 15px 50px;
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #232323;
  }
  &:focus {
    background-color: #343434;
  }
  &--light {
    background-color: #fff;
    color: #000;
    &:hover {
      background-color: #d9d9d9;
    }
    &:focus {
      background-color: #eaeaea;
    }
  }
  &:focus {
    outline: none;
  }
}
</style>
