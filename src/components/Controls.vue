<template>
  <div class="container">
    <div class="container__info--big">
      <div class="container__data">
        <p class="container__info--title">Km</p>
        <p class="container__info--data">{{longitud}}</p>
      </div>
      <div class="container__data">
        <p class="container__info--title">Tiempo</p>
        <p class="container__info--data">{{getHour}}</p>
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
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0
  }),
  props: {
    longitud: {
      required: false
    }
  },
  created() {},
  methods: {
    startRoute() {
      this.$emit("startRoute");
      this.startCounter();
    },
    startCounter() {
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      this.seconds++;
      if (this.minutes > 59) {
        this.hours++;
        this.minutes = 0;
        this.seconds = 0;
      }
      if (this.seconds > 59) {
        this.minutes++;
        this.seconds = 0;
      }
    }
  },
  computed: {
    getHour() {
      const seconds = this.seconds > 9 ? this.seconds : `0${this.seconds}`;
      const minutes = this.minutes > 9 ? this.minutes : `0${this.minutes}`;
      const hours = this.hours > 9 ? this.hours : `0${this.hours}`;

      return `${hours} : ${minutes} : ${seconds}`;
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
