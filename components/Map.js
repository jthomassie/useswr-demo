// components/Map.js
// https://github.com/mapbox/mapbox-react-examples
// https://dev.to/niharikak101/integrating-mapbox-with-next-js-the-cheaper-alternative-to-google-maps-g39

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import _, { map } from "lodash";
import * as turf from "@turf/turf";

// const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
// const MAP_STYLE = process.env.MAP_STYLE;
// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = "mapbox://styles/adaction/cl2gdkkg5001716o40jakcqje";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRhY3Rpb24iLCJhIjoiY2wxbDM0MmczMDVydjNsbnUyODlyemZ4ZyJ9.eLDkcPThPRbLvYpnjpbYJw";

const Map = ({ mapdata }) => {
  //
  const [map, setMap] = useState(null);
  const [mapData, setMapdata] = useState({
    type: "FeatureCollection",
    features: [],
  });
  //
  const mapContainerRef = useRef(null);

  //
  let layer = {
    features: {
      geo: mapData,
      id: "",
      nm: "features",
      color: "red",
    },
  };

  // props to html for popup
  const propsToHtml = (props) => {
    let keys = _.keys(props);
    let htm = "";
    for (let i = 0; i < keys.length; i++) {
      htm += `<div class="pop gray-text"><span class="pop bold gray-text">${
        keys[i]
      }:</span> ${props[keys[i]]}</div>`;
    }
    return htm;
  };

  // add a geojson layer to map
  const addLayer = (
    map,
    data,
    sourceId,
    promoteId,
    type,
    layerId,
    before,
    paint,
    layout,
    filter
  ) => {
    if (map != null) {
      let sourceOptions = {
        type: "geojson",
        data: data,
      };
      if (promoteId != null) {
        sourceOptions.promoteId = promoteId;
      }
      if (map != null && data != undefined) {
        map.addSource(sourceId, sourceOptions);
      }
      //
      map.addLayer(
        {
          id: layerId,
          type: type,
          source: sourceId,
          paint: paint,
          layout: layout,
          filter: filter,
        },
        before
      );
    }
  };

  // init map on component mount
  useEffect(() => {
    // new map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [-82.741, 40.246], // #6.4/40.246/-82.741
      zoom: 5.5,
      // hash: true,
    });

    // add controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 120,
        unit: "imperial",
      })
    );

    // add events
    // map.on("move", () => {
    //   setLng(map.getCenter().lng.toFixed(4));
    //   setLat(map.getCenter().lat.toFixed(4));
    //   setZoom(map.getZoom().toFixed(2));
    // });

    // update cursor
    map.on("mousemove", ["features"], (e) => {
      map.getCanvas().style.cursor = "pointer";
    });
    // update cursor
    map.on("mouseleave", ["features"], (e) => {
      map.getCanvas().style.cursor = "default";
    });
    // click feature
    map.on("click", "features", (e) => {
      e.originalEvent.preventDefault();
      if (e.lngLat == undefined || e.features[0].properties == undefined) {
        return;
      }
      // props, coords
      let f = e.features[0];
      let props = f.properties;
      let loc = [e.lngLat.lng, e.lngLat.lat];
      // find feature in source
      let id = f.id;
      let nm = f.layer.id;
      let fc = layer[nm].geo;
      let fcid = layer[nm].id;
      let hf = _.find(fc.features, (ff) => {
        return ff.properties[fcid] == id;
      });
      // highlightSelectFeature(map, hf);
      // get length in miles
      // let length = turf.length(hf, { units: "miles" });
      if (length > 0) {
        length = `${length.toFixed(1)}-mile segment`;
      }
      // choose title
      let title = "";
      if (props.title) {
        title = props.title;
      } else if (props.POI_NAME) {
        title = props.POI_NAME;
      } else if (props.name) {
        title = props.name;
      } else if (props.SUBTYPE) {
        title = props.SUBTYPE;
      } else {
        title = "Un-named feature";
      }
      //
      let color = layer[nm].color;
      let layerName = layer[nm].nm;
      let htmlProps = propsToHtml(props);
      let html = `<div class="pop"><span class="pop bold lg">${title}</span></div>`;
      html += `<div class="pop"><span class="dot ${color}"></span><span class="pop bold">${layerName}</span></div>`;
      if (length != 0) {
        html += `<div class="pop"><span class="pop bold">${length}</span></div>`;
      }
      html += `<hr />`;
      html += htmlProps;
      // popup
      let popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        offset: 6,
      })
        .setLngLat(loc)
        .setHTML(html)
        .addTo(map)
        .on("close", () => {
          // clearHighlights(map);
        });
      // google analytics
      // ga.event({
      //   action: "select_content",
      //   params: {
      //     feature: title,
      //     id: e.features[0].id,
      //   },
      // });
    });

    // on map load
    map.on("load", () => {
      // add 'features' layer
      const fCircleRadius = ["interpolate", ["linear"], ["zoom"], 2, 2, 16, 9];
      const fOpacity = ["interpolate", ["linear"], ["zoom"], 5, 1, 5.5, 1];
      //
      // map,
      // data,
      // sourceId,
      // promoteId,
      // type,
      // layerId,
      // before,
      // paint,
      // layout,
      // filter

      //
      addLayer(
        map,
        mapData,
        "features",
        null,
        "circle",
        "features",
        null,
        {
          "circle-radius": fCircleRadius,
          "circle-color": "#c10000",
          "circle-opacity": fOpacity,
          "circle-stroke-width": 0.6,
          "circle-stroke-color": "#fff",
          "circle-stroke-opacity": 0.6,
        },
        {},
        ["!", false]
      );
      // set map state
      setMap(map);
    });

    // remove map on unmount
    return () => map.remove();
  }, []);

  // update map on mapdata load
  useEffect(() => {
    if (!map) {
      return;
    }
    setMapdata(mapData);
    map.getSource("features").setData(mapdata);
    // map.resize();
    let bbox = turf.bbox(mapdata);
    console.log(bbox);
    //
    map.fitBounds(bbox, {
      padding: 30,
      speed: 0.5,
      curve: 0.9,
      duration: 3000,
      essential: true,
    });
  }, [mapdata]);

  return (
    <>
      <div className="map-container" ref={mapContainerRef} />
    </>
  );
};

export default Map;
