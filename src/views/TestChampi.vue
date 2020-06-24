<template>
  <div>
    <div id="tracking">{{currentPosition}}</div>
    <div id="map"></div>
  </div>
</template>
<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Circle from "ol/geom/Circle";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

export default {
  components: {},
  data: () => ({
    zoom: 16,
    currentPosition: [0, 0],
    startingPoint: null,
    map: null
  }),
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: this.currentPosition,
          zoom: 12
        })
      });
    },
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
      this.initMap();
    },
    successPosition(position) {
      const positionLonLat = [
        position.coords.longitude,
        position.coords.latitude
      ];
      this.currentPosition = fromLonLat(positionLonLat);
      this.map.getView().setCenter(fromLonLat(positionLonLat));
      if (!this.circle) {
        this.circle = new Circle(this.currentPosition, 55);
        const layer = new VectorLayer({
          source: new VectorSource({
            projection: "EPSG:4326",
            features: [new Feature(this.circle)]
          }),
          style: [
            new Style({
              stroke: new Stroke({
                color: "blue",
                width: 1
              }),
              fill: new Fill({
                color: "rgba(0, 0, 255, 0.9)"
              })
            })
          ]
        });
        this.startingPoint = new Point(fromLonLat(positionLonLat));
        this.map.addLayer(layer);
        return;
      }
      const currentPoint = new Point(fromLonLat(positionLonLat));

      const layerLine = new VectorLayer({
        source: new VectorSource({
          projection: "EPSG:4326",
          features: [
            new Feature(new LineString([this.startingPoint, currentPoint]))
          ]
        })
      });
      this.map.addLayer(layerLine);
      this.circle.setCenter(this.currentPosition);
    },
    failurePosition: function(err) {
      alert("Error Code: " + err.code + " Error Message: " + err.message);
    }
  },
  computed: {},
  mounted() {
    this.trackPosition();
  }
};
</script>
<style scoped lang="scss">
#tracking {
  height: 100%;
}
#map {
  width: 1200px;
  height: 800px;
}
</style>