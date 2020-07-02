
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
// import Circle from "ol/geom/Circle";

import Feature from "ol/Feature";
import { Icon, Style } from 'ol/style.js'
import Point from "ol/geom/Point";
// import iconCursor from "@/assets/cursor.svg"

const createPoint = (pointCenter) => {
  const circle = new Point(fromLonLat(pointCenter));
  const layer = new VectorLayer({
    source: new VectorSource({
      projection: "EPSG:4326",
      features: [new Feature(circle)]
    }),
    style: [
      new Style({
        image: new Icon( ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://img.icons8.com/fluent/48/000000/google-maps-new.png'
        }))
    })
    ]
  });
  return {layer, circle};
}

export default {createPoint};