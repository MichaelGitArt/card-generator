<template>
  <div class="container">
    <img v-if="cardUrl" :src="cardUrl" :alt="'Открытка для' + name" />
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

<style scoped></style>
