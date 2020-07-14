<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>здесь будет результат</h2>
      </div>
      <div class="col">
        <form class="main-form">
          <a-textfield
            :options="nameOption"
            label="Для кого открытка?"
            placeholder="Аня"
          />
          <a-select
            v-model="holiday"
            :items="holidaySelect"
            label="С чем поздравляем?"
            placeholder="Аня"
          />
          <a-select
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
      <a-btn @click="close">Ok</a-btn>
    </a-modal>
  </div>
</template>

<script>
// @ is an alias to /src

import AModal from "../components/General/AModal";

export default {
  name: "Home",
  components: {
    AModal,
  },
  data: () => ({
    faqModal: false,
    nameOption: [
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
  mounted() {
    fetch("https://loh.biz/8/generate.php?name=Michael").then((result) => {
      console.log(result);
    });
  },
  methods: {
    openModal() {
      this.faqModal = true;
    },
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
  max-width: 300px;
  display: flex;
  flex-direction: column;
}
</style>
