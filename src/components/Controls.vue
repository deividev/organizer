<template>
  <div class="container">
    <div class="container__info--big">
      <div class="container__data">
        <p class="container__info--title">Km</p>
        <p class="container__info--data">{{longitud}}</p>
      </div>
      <div class="container__data">
        <p class="container__info--title">Tiempo</p>
        <p class="container__info--data">00:30:02</p>
      </div>
    </div>
    <div class="container__info">
      <div class="container__data">
        <p class="container__info--title">Calorias</p>
        <p class="container__info--data">101</p>
      </div>
      <div class="container__data">
        <p class="container__info--title">Min/km</p>
        <p class="container__info--data">10'</p>
      </div>
      <div class="container__data">
        <p class="container__info--title">Pasos</p>
        <p class="container__info--data">8123</p>
      </div>
    </div>
    <button @click="startRoute()" class="btn">Start</button>
    <button class="btn">Finish</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    longitud: {
      required: false
    }
  },
  methods: {
    startRoute() {
      this.$emit("startRoute");
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
  margin: 5px;
  padding: 20px;
  background-color: rgb(45, 120, 196);
  border: 0;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  transition: all 1s;
}

.btn:hover {
  background-color: rgb(87, 171, 255);
  color: #111;
}

.container {
  padding: 15px;
}

.container__info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.container__info--big {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container__info--data {
  margin: 5px;
  padding: 0px 5px;
  font-size: 20px;
  font-weight: 500;
}

.container__info--title {
  margin: 5px;
  padding: 0px 5px;
}

.container__data {
  padding: 0px 10px;
}
</style>
