import { MapContainer, TileLayer } from "react-leaflet";

import { Select, MenuItem, InputLabel } from "@mui/material";

import "leaflet/dist/leaflet.css";

import { useState } from "react";

const MapView = () => {
  const [selectedOption, setSelectedOption] = useState("Any Neighbourhood");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const neighbourhoods = ["Any Neighbourhood", "option1", "option2", "option3"];

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{
          position: "absolute",
          top: "5rem",
          right: "1rem",
          zIndex: 1000,
          background: "white",
        }}
        variant="outlined"
      >
        {neighbourhoods.map((neighbourhood) => {
          return <MenuItem value={neighbourhood}>{neighbourhood}</MenuItem>;
        })}
      </Select>
      <MapContainer
        center={[53.5280968, -113.5276029]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "calc(100vh - 4rem)" }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          // url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </>
  );
};

export default MapView;
