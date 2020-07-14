<script>
export default {
  name: "close-icon",
  functional: true,
  render(h) {
    return h(
      "svg",
      {
        attrs: {
          width: "12px",
          height: "12px",
          viewBox: "0 0 12 12",
          xmlSpace: "preserve",
        },
      },
      [
        h("line", {
          attrs: {
            x1: 1,
            y1: 11,
            x2: 11,
            y2: 1,
            stroke: "white",
          },
          style: {
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        }),
        h("line", {
          attrs: {
            x1: 1,
            y1: 1,
            x2: 11,
            y2: 11,
            stroke: "white",
          },
          style: {
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        }),
      ]
    );
  },
};
</script>
