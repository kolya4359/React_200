/*global kakao*/
import React, { Component } from "react";
import jsonData from "./map_info.json";
import $ from "jquery";

class App extends Component {
  componentDidMount() {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.505496, 127.005116),
        level: 9,
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 5,
    });

    var markers = $(jsonData.positions).map(function (i, position) {
      var imageSrc = require("./img/hop0" + (i + 1) + ".png");
      if (position.finish == "완치") {
        imageSrc = require("./img/clearp0" + (i + 1) + ".png");
      }

      var imageSize = new kakao.maps.Size(60, 70);
      var imageOption = { offset: new kakao.maps.Point(27, 69) };

      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(position.lat, position.lng),
        image: markerImage,
      });
      return marker;
    });
    clusterer.addMarkers(markers);
  }

  render() {
    return <div id="map" style={{ width: "100%", height: "700px" }}></div>;
  }
}
export default App;
