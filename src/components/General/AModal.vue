<script>
import CloseIcon from "./CloseIcon";

export default {
  props: {
    title: {
      type: String,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
  render(h) {
    console.log("modal!");

    let content = [
      h(
        "div",
        {
          class: "a-modal-content",
        },
        this.$scopedSlots.default({
          close: () => {
            this.close();
          },
        })
      ),
    ];
    let header = this.$props.title
      ? h("header", { class: "a-modal-header" }, [
          h("h3", {}, this.$props.title),
        ])
      : null;

    let closeBtn = h(
      "div",
      {
        class: "a-modal__close-btn",
        on: {
          click: this.close.bind(this),
        },
      },
      [h(CloseIcon)]
    );

    let modal = h(
      "div",
      {
        class: "a-modal",
      },
      [closeBtn, header, content]
    );

    return this.value
      ? h(
          "div",
          {
            class: "a-modal-wrap",
          },
          [modal]
        )
      : null;
  },
};
</script>

<style scoped lang="scss">
.a-modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-modal {
  position: relative;
  width: 100%;
  max-height: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  background: #000;
  border-radius: 30px;
  padding: 10px 15px 20px;
  color: #fff;
  &__close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    height: 20px;
    width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.a-modal-content {
  overflow-y: auto;
  max-height: 100%;
  @include custom-scroll();
}
</style>
