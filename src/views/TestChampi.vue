<template>
  <div id="tracking">{{positions}}</div>
</template>
<script>
export default {
  components: {},
  methods: {
    trackPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          this.successPosition,
          this.failurePosition,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
          }
        );
      } else {
        alert(`Browser doesn't support Geolocation`);
      }
    },
    successPosition: function(position) {
      this.positions.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      this.centerPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    },
    failurePosition: function(err) {
      alert("Error Code: " + err.code + " Error Message: " + err.message);
    }
  },
  computed: {},
  data: () => ({
    centerPosition: {
      lat: 10.762622,
      lng: 106.660172
    },
    zoom: 16,
    positions: []
  }),
  mounted() {
    this.trackPosition();
  }
};
</script>
<style scoped lang="scss">
#tracking {
  height: 100%;
}
</style>