<template>
  <div>
    <Map
      :routeStarted="routeStarted"
      :currentPosition="currentPosition"
      @changeLongitud="updateRouteLong"
    ></Map>
    <controls :longitud="longitud" @startRoute="startRoute"></controls>
  </div>
</template>
<script>
import Map from "@/components/Map";
import Controls from "@/components/Controls";
export default {
  components: { Map, Controls },
  data: () => ({
    zoom: 16,
    currentPosition: [0, 0],
    startingPoint: null,
    map: null,
    lineString: null,
    circle: null,
    longitud: 0,
    routeStarted: false
  }),
  methods: {
    startRoute() {
      this.routeStarted = true;
    },
    successPosition(position) {
      const positionLonLat = [
        position.coords.longitude,
        position.coords.latitude
      ];
      this.currentPosition = positionLonLat;
    },
    failurePosition: function(err) {
      alert(
        "Error Code: " + err.code + " Error Message: holaasdasd" + err.message
      );
    },
    watchGPSLocation() {
      if (!navigator.geolocation) {
        alert(`Browser doesn't support Geolocation`);
        return;
      }
      navigator.geolocation.watchPosition(
        this.successPosition,
        this.failurePosition,
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    },
    updateRouteLong(ev) {
      this.longitud = ev;
    }
  },
  computed: {},
  mounted() {
    this.watchGPSLocation();
  }
};
</script>
<style lang="scss">
body {
  margin: 0px;
}
</style>