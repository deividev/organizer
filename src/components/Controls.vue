<template>
  <div>
    <button @click="startRoute()" class="btn">Start</button>
    <button class="btn">Finish</button>
    <h1>{{longitud}}</h1>
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
  padding: 8px;
  background-color: rgb(87, 171, 255);
  border: 1px solid #444444;
  border-radius: 2px;
  color: #fff;
}
</style>
