<template>
  <div class="container">
    <div class="row">
      <div class="col left-column">
        <template v-if="cardUrl">
          <img :src="cardUrl" :alt="'Открытка для' + name" />
          <a-btn :disabled="loading" @click="repeat"
            >Згенерировать еще раз</a-btn
          >
        </template>
        <h2 v-else>здесь будет результат</h2>
      </div>
      <div class="col right-column">
        <div v-if="cardUrl" class="result">
          <h3>Ваша открытка готова</h3>
          <a-btn :disabled="loading" @click="copyLink"
            >Копировать ссылку для отправки</a-btn
          >
          <span class="result__link">{{ shareUrl }}</span>
          <a class="result__clear" @click.prevent="clear" href="#"
            >Охрана! Отмена!</a
          >
        </div>
        <form v-else-if="controls" @submit.prevent="send" class="main-form">
          <a-textfield
            class="main-form__control"
            :options="controls.genders"
            v-model="name"
            @changeOption="changeGender"
            label="Для кого открытка?"
            centered
          />
          <a-select
            class="main-form__control"
            v-model="category"
            :items="controls.categories"
            label="С чем поздравляем?"
            placeholder="Аня"
          />
          <a-select
            class="main-form__control"
            v-model="mode"
            :items="controls.modes"
            label="Режим"
            placeholder="Аня"
          />

          <div class="button-container">
            <a-btn :disabled="loading">Сгенерировать</a-btn>
          </div>
          <div style="margin-top: 20px;">
            <a @click.prevent="openModal" href="#">Как это работает?</a>
          </div>
        </form>
      </div>
    </div>
    <a-modal v-model="faqModal" title="Как єто работает?" v-slot="{ close }">
      <p>
        Как єто работает бьвао.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias
        eius excepturi iste neque, nobis optio quibusdam similique ullam
        voluptates.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias
        eius excepturi iste neque, nobis optio quibusdam similique ullam
        voluptates.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias
        eius excepturi iste neque, nobis optio quibusdam similique ullam
        voluptates.
      </p>
      <a-btn @click="close" light class="w-100">Понятно</a-btn>
    </a-modal>
  </div>
</template>

<script>
import AModal from "../components/General/AModal";
import { mapState } from "vuex";
import { copyText } from "../utils/copy-text";

export default {
  name: "Home",
  components: {
    AModal,
  },
  data: () => ({
    name: "",
    faqModal: false,
    gender: "",
    category: -1,
    mode: -1,
    loading: false,
  }),
  mounted() {
    this.$store.dispatch("initApp");
  },
  methods: {
    changeGender(id) {
      this.gender = id;
    },
    openModal() {
      this.faqModal = true;
    },
    clear() {
      this.$store.commit("clear");
    },
    repeat() {
      this.send();
    },
    validate() {
      if (!this.name) {
        alert("Введи имя, пожалуйста");
        return null;
      } else if (this.category === -1) {
        alert("Выбери с чем поздравляем");
        return null;
      } else if (this.mode === -1) {
        alert("Как будем поздравлять? Выбери режим");
        return null;
      }
      return true;
    },
    send() {
      if (!this.validate() || this.loading) return;

      this.loading = true;
      this.$store.dispatch("startLoading");

      const mode = this.controls.modes.find((mode) => mode.id === this.mode)
        .key;
      const category = this.controls.categories.find(
        (cat) => cat.id === this.category
      ).key;
      const gender = this.controls.genders.find((cat) => cat.id === this.gender)
        .key;
      fetch(
        `https://loh.biz/8/api.php?action=image&name=${this.name}&category=${category}&mode=${mode}&gender=${gender}`
      )
        .then((res) => res.json())
        .then((resData) => {
          if (resData.error) {
            return alert(resData.result);
          }
          this.$store.dispatch("setCard", resData.result);
        })
        .finally(() => {
          this.loading = false;
          this.$store.dispatch("endLoading");
        });
    },
    copyLink() {
      copyText(this.shareUrl);
    },
  },
  computed: {
    ...mapState(["cardUrl", "cardId", "shareUrl", "controls"]),
  },
};
</script>

<style lang="scss">
@import "~css-mqpacker-starter";

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 30px;
}

.main-form {
  text-transform: uppercase;
  max-width: 500px;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  &__control {
    margin-bottom: 30px;
  }
}

.result {
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  h3 {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .a-btn {
    margin-bottom: 20px;
  }
  &__clear {
    text-transform: uppercase;
  }
  &__link {
    margin-bottom: 20px;
  }
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left-column img {
  max-width: 100%;
}

@include lg {
  .row {
    grid-template-columns: 1fr;
    grid-auto-flow: dense;
  }

  .right-column {
    grid-row: 1/3;
  }
}
</style>
