<template>
  <div>
    <div id="tracking">{{currentPosition}}</div>
    <h1 style="float: left;">{{longitud}}</h1>
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
    map: null,
    lineString: null,
    circle: null,
    longitud: 0
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
      //      this.getGPSLocation();
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
      this.map.getView().setCenter(fromLonLat(positionLonLat));
      this.currentPosition = fromLonLat(positionLonLat);
      if (!this.circle) {
        this.createPoint(positionLonLat);
        // this.circle.setCenter(fromLonLat(positionLonLat));
        return;
      }
      this.circle.setCenter(fromLonLat(positionLonLat));
      if (!this.lineString) {
        this.createLineString(this.startingPoint, fromLonLat(positionLonLat));
        return;
      }
      this.lineString.appendCoordinate(this.currentPosition);
      this.longitud = this.formatLineStringLength(this.lineString);
    },
    failurePosition: function(err) {
      alert("Error Code: " + err.code + " Error Message: " + err.message);
    },
    createPoint(pos) {
      this.circle = new Circle(this.currentPosition, 15);
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
      this.startingPoint = fromLonLat(pos);
      this.map.addLayer(layer);
    },
    formatLineStringLength(line) {
      let length = line.getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },
    createLineString(startingPoint, endPoint) {
      this.lineString = new LineString([startingPoint, endPoint]);
      const lineLayer = new VectorLayer({
        source: new VectorSource({
          projection: "EPSG:4326",
          features: [new Feature(this.lineString)]
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
      this.map.addLayer(lineLayer);
    },
    updateLineSection() {},
    getGPSLocation() {
      if (!navigator.geolocation) {
        alert(`Browser doesn't support Geolocation`);
        return;
      }
      const watchPositionConfig = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      };
      navigator.geolocation.watchPosition(
        this.successPosition,
        this.failurePosition,
        watchPositionConfig
      );
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
  width: 400px;
  height: 200px;
}
</style>