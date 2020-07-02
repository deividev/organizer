
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Circle from "ol/geom/Circle";

import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

const createPoint = (pointCenter) => {
  const circle = new Circle(fromLonLat(pointCenter), 5);
  const layer = new VectorLayer({
    source: new VectorSource({
      projection: "EPSG:4326",
      features: [new Feature(circle)]
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
  return {layer, circle};
}

export default {createPoint};