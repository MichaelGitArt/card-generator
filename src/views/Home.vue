<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>здесь будет результат</h2>
      </div>
      <div class="col">
        <form class="main-form">
          <div class="input-container">
            <label
              >Для кого открытка?
              <input
                type="text"
                value=""
                autofocus=""
                name="name"
                placeholder="ИМЯ"
              />
            </label>
          </div>
          <div class="input-container">
            <label>С чем поздравляем?</label>
            <input
              type="text"
              value=""
              autofocus=""
              name="name"
              placeholder="ПРАЗДНИК"
            />
          </div>
          <div class="input-container">
            <label>Режим</label>
            <input
              type="text"
              value=""
              autofocus=""
              name="name"
              placeholder="ДОБРЫЙ"
            />
          </div>
          <div class="button-container">
            <button type="submit" id="generate_btn">Сгенерировать</button>
          </div>
          <div style="margin-top: 20px;">
            <a href="#">Как это работает?</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 30px;
}
</style>
