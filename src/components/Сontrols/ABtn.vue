<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: String,
  },
  render(r) {
    return r(
      this.tag,
      {
        class: {
          "a-btn": true,
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
}
</style>
