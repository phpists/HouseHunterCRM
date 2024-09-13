import React, { useState } from "react";
import { TileLayer, FeatureGroup, MapContainer } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

export const DrawTools = ({ polygon, onChangePolygon }) => {
  const [refresh, setRefresh] = useState(false);

  const _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
  };

  const _onCreated = (e) => {
    let layer = e.layer;
    onChangePolygon(layer._latlngs);
  };

  const _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });

    if (numDeleted > 0) {
      onChangePolygon(null);
      setRefresh(true);
      setTimeout(() => setRefresh(false), 300);
    }
  };

  const _editableFG = null;

  return (
    <MapContainer
      center={[49.844003, 24.026193]}
      zoom={13}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        {refresh ? null : (
          <EditControl
            position="topright"
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              line: false,
              marker: false,
              polyline: false,
              circlemarker: false,
              circle: false,
              polygon: !polygon,
            }}
          />
        )}
      </FeatureGroup>
    </MapContainer>
  );
};
