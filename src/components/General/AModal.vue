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
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-modal {
  position: relative;
  width: 100%;
  max-height: 90%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  background: #000;
  border-radius: 30px;
  padding: 15px 30px 25px;
  color: #fff;
  &__close-btn {
    position: absolute;
    right: 13px;
    top: 13px;
    height: 30px;
    width: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
    svg {
      height: 20px;
      width: 20px;
    }
  }
}

.a-modal-header h3 {
  text-transform: uppercase;
  text-align: center;
  font-size: 1em;
  margin-bottom: 10px;
}

.a-modal-content {
  overflow-y: auto;
  max-height: 100%;
  font-size: 1em;

  @include custom-scroll();
}
</style>
