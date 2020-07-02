<template>
  <div id="map"></div>
</template>
<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import { Style } from 'ol/style.js'
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import mapUtils from "@/utils/mapUtils.js"

export default {
  components: {},
  data: () => ({
    zoom: 16,
    map: null,
    lineString: null,
    layerCircle: null,
    layerIcon: null,
    longitud: 0,
    startingPoint: null
  }),
  props: {
    currentPosition: {
      type: Array
    },
    routeStarted: {
      type: Boolean
    }
  },
  watch: {
    currentPosition(newVal) {
      this.updatePosition(newVal);
    }
  },
  methods: {
    initMap() {
      return new Map({
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
    updatePosition(position) {
      this.map.getView().setCenter(fromLonLat(position));
      if (!this.layerCircle) {
        const {layer , circle} = mapUtils.createPoint(position);
        this.circle = circle;
        this.layerCircle = layer;
        this.map.addLayer(this.layerCircle);
      }
      this.circle.setCoordinates(fromLonLat(position));
      if (this.routeStarted) {
        if (!this.lineString) {
          this.startingPoint = fromLonLat(position);
          this.createLineString(this.startingPoint, fromLonLat(position));
          return;
        }
        this.updateLinePoints(fromLonLat(position));
        this.longitud = this.formatLineStringLength(this.lineString);
        this.$emit("changeLongitud", this.longitud);
      }
    },
    /*createPoint(pointCenter) {
      this.circle = new Circle(fromLonLat(pointCenter), 5);
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
      this.map.addLayer(layer);
    },*/
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
    updateLinePoints(position) {
      this.lineString.appendCoordinate(position);
    }
  },
  computed: {},
  mounted() {
    this.map = this.initMap();
  }
};
</script>
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 80vh;
}
</style>