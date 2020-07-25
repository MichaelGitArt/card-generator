<template>
  <div class="container share">
    <img v-if="cardUrl" :src="cardUrl" alt="Открытка для тебя" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("setCard", this.$route.params.id);
  },
  computed: {
    ...mapState(["cardUrl", "cardId"]),
  },
};
</script>

<style scoped lang="scss">
.share {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
  }
}
</style>
