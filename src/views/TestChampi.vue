<template>
  <div>
    <div id="map"></div>
    <div>
      <h1>{{longitud}}</h1>
      <button class="btn">Start</button>
      <button class="btn">Finish</button>
    </div>
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
      this.getGPSLocation();
      // if (navigator.geolocation) {
      //   navigator.geolocation.watchPosition(
      //     this.successPosition,
      //     this.failurePosition,
      //     {
      //       enableHighAccuracy: true,
      //       timeout: 15000,
      //       maximumAge: 0
      //     }
      //   );
      // } else {
      //   alert(`Browser doesn't support Geolocation`);
      // }
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
        return;
      }
      this.circle.setCenter(fromLonLat(positionLonLat));
      if (!this.lineString) {
        this.createLineString(this.startingPoint, fromLonLat(positionLonLat));
        return;
      }
      this.updateLinePoints();
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
    updateLinePoints() {
      this.lineString.appendCoordinate(this.currentPosition);
    },
    getGPSLocation() {
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
    }
  },
  computed: {},
  mounted() {
    this.trackPosition();
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
#tracking {
  height: 100%;
}
#map {
  width: 100vw;
  height: 60vh;
}
</style>