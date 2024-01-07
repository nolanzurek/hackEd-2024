import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Select, MenuItem, InputLabel } from "@mui/material";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { fetchTableData, TableData } from "../lib/supabase";

const MapView = () => {
  const tables: String[] = [
    "BikeRacksAndRepairStands",
    "Neighbourhoods",
    "Parks",
    "PropertyAssessments",
    "RainfallGauge",
    "TrafficDisruptions",
    "VegetationAreasNaturalized",
    "busStopsByLandmark",
    "trees",
  ];

  //   tables
  const [parkMarkers, setParkMarkers] = useState<TableData<"Parks">[]>([]);
  const [bikeRackMarkers, setBikeRackMarkers] = useState<
    TableData<"BikeRacksAndRepairStands">[]
  >([]);
  const [neighbourhoods, setNeighbourhoods] = useState<
    TableData<"Neighbourhoods">[]
  >([]);
  const [propertyAssessments, setPropertyAssessments] = useState<
    TableData<"PropertyAssessments">[]
  >([]);
  const [rainfallGaugeMarkers, setRainfallGaugeMarkers] = useState<
    TableData<"RainfallGauge">[]
  >([]);
  const [trafficDisruptions, setTrafficDisruptions] = useState<
    TableData<"TrafficDisruptions">[]
  >([]);
  const [vegetationAreas, setVegetationAreas] = useState<
    TableData<"VegetationAreasNaturalized">[]
  >([]);
  const [busStopMarkers, setBusStopMarkers] = useState<
    TableData<"busStopsByLandmark">[]
  >([]);
  const [treeMarkers, setTreeMarkers] = useState<TableData<"trees">[]>([]);

  const [selectedOption, setSelectedOption] = useState("Any Neighbourhood");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    fetchTableData("Parks").then(setParkMarkers);
    fetchTableData("BikeRacksAndRepairStands").then(setBikeRackMarkers);
    fetchTableData("Neighbourhoods").then(setNeighbourhoods);
    fetchTableData("PropertyAssessments").then(setPropertyAssessments);
    fetchTableData("RainfallGauge").then(setRainfallGaugeMarkers);
    fetchTableData("TrafficDisruptions").then(setTrafficDisruptions);
    fetchTableData("VegetationAreasNaturalized").then(setVegetationAreas);
    fetchTableData("busStopsByLandmark").then(setBusStopMarkers);
    fetchTableData("trees").then(setTreeMarkers);
  }, []);

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
          //   url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {!!parkMarkers.length &&
          parkMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.LATITUDE, marker.LONGITUDE]}
            >
              <Popup>{marker.COMMON_NAME || "An Unnamed Park"}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};

export default MapView;
