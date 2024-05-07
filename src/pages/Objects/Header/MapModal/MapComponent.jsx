import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DrawTools } from "./DrawTools";
import styled from "styled-components";

export const MapComponent = ({ polygon, onChangePolygon }) => {
  const mapConfig = {
    lat: 22,
    lng: -72,
    zoom: 6,
  };

  return (
    <StyledMapComponent>
      <MapContainer
        center={[mapConfig.lat, mapConfig.lng]}
        zoom={mapConfig.zoom}
        style={{ width: "100%", height: "100%" }}
      >
        <DrawTools polygon={polygon} onChangePolygon={onChangePolygon} />{" "}
        <TileLayer
          attribution="Tiles &copy; Carto"
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </StyledMapComponent>
  );
};

const StyledMapComponent = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 400px;
  .leaflet-draw-edit-edit {
    display: none !important;
  }
`;
