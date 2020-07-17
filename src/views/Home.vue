<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <template v-if="cardUrl">
          <img :src="cardUrl" :alt="'Открытка для' + name" />
          <a-btn @click="clear">Згенерировать еще раз</a-btn>
        </template>
        <h2 v-else>здесь будет результат</h2>
      </div>
      <div class="col">
        <div v-if="cardUrl" class="result">
          <h3>Ваша открітка готова</h3>
          <a-btn @click="copyLink">Копировать ссылку для отправки</a-btn>
          <a class="result__clear" @click.prevent="clear" href="#"
            >Охрана! Отмена!</a
          >
        </div>
        <form v-else @submit.prevent="send" class="main-form">
          <a-textfield
            class="main-form__control"
            :options="genderOptions"
            v-model="name"
            @changeOption="changeGender"
            label="Для кого открытка?"
            placeholder="Аня"
            centered
          />
          <a-select
            class="main-form__control"
            v-model="holiday"
            :items="holidaySelect"
            label="С чем поздравляем?"
            placeholder="Аня"
          />
          <a-select
            class="main-form__control"
            v-model="mode"
            :items="modeSelect"
            label="Режим"
            placeholder="Аня"
          />

          <div class="button-container">
            <a-btn>Сгенерировать</a-btn>
          </div>
          <div style="margin-top: 20px;">
            <a @click.prevent="openModal" href="#">Как это работает?</a>
          </div>
        </form>
      </div>
    </div>
    <a-modal v-model="faqModal" title="Как єто работает?" v-slot="{ close }">
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

    genderOption: "",
    genderOptions: [
      {
        name: "Ж",
        id: 0,
      },
      {
        name: "М",
        id: 1,
      },
    ],
    holiday: -1,
    holidaySelect: [
      {
        name: "День рождения",
        id: 0,
      },
      {
        name: "Новый год",
        id: 1,
      },
      {
        name: "Много ",
        id: 2,
      },
      {
        name: "Празников",
        id: 3,
      },
      {
        name: "Празников",
        id: 4,
      },
      {
        name: "Празников",
        id: 5,
      },
    ],
    mode: -1,
    modeSelect: [
      {
        name: "Добрый",
        id: 0,
      },
      {
        name: "Злой",
        id: 1,
      },
      {
        name: "Веселый ",
        id: 2,
      },
    ],
  }),
  methods: {
    changeGender(id) {
      this.genderOption = id;
    },
    openModal() {
      this.faqModal = true;
    },
    clear() {
      this.$store.commit("clear");
    },
    copyLink() {
      copyText(this.shareUrl);
    },
    send() {
      const name = this.name;
      fetch(`https://loh.biz/8/generate.php?name=${name}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.error) {
            return alert(resData.result);
          }
          this.$store.dispatch("setCard", resData.result);
        });
    },
  },
  computed: {
    ...mapState(["cardUrl", "cardId", "shareUrl"]),
  },
};
</script>

<style lang="scss">
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
}
</style>
