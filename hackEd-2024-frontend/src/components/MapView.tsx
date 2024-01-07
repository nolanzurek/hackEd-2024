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

  const neighbourhoodsHardcoded = [
    "Abbottsfield",
    "Alberta Avenue",
    "Argyll",
    "Aspen Gardens",
    "Athlone",
    "Avonmore",
    "Balwin",
    "Bellevue",
    "Belvedere",
    "Blatchford",
    "Bonnie Doon",
    "Calder",
    "Calgary Trail North",
    "Calgary Trail South",
    "Capilano",
    "Crestwood",
    "Cromdale",
    "Delton",
    "Delwood",
    "Dovercourt",
    "Duggan",
    "Eastwood",
    "Edmonton Northlands",
    "Elmwood Park",
    "Empire Park",
    "Forest Heights",
    "Fulton Place",
    "Glengarry",
    "Glenora",
    "Gold Bar",
    "Grandview Heights",
    "Greenfield",
    "Grovenor",
    "Highlands",
    "Holyrood",
    "Idylwylde",
    "Inglewood",
    "Kenilworth",
    "Kensington",
    "Killarney",
    "King Edward Park",
    "Lansdowne",
    "Lauderdale",
    "Laurier Heights",
    "Lendrum Place",
    "Malmo Plains",
    "McQueen",
    "Montrose",
    "Newton",
    "North Glenora",
    "Ottewell",
    "Parkdale",
    "Parkview",
    "Patricia Heights",
    "Pleasantview",
    "Prince Charles",
    "Prince Rupert",
    "Quesnell Heights",
    "Rideau Park",
    "Rosslyn",
    "Royal Gardens",
    "Rundle Heights",
    "Sherbrooke",
    "Spruce Avenue",
    "Strathcona",
    "Strathearn",
    "Terrace Heights",
    "University of Alberta Farm",
    "Virginia Park",
    "Wellington",
    "Westbrook Estates",
    "Westmount",
    "Westwood",
    "Woodcroft",
  ];

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

  const [mode, setMode] = useState("light");

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
        {neighbourhoods.length > 0
          ? neighbourhoods.map((neighbourhood) => {
              return (
                <MenuItem value={neighbourhood}>
                  {neighbourhood.NEIGHBOURHOOD_NAME}
                </MenuItem>
              );
            })
          : neighbourhoodsHardcoded.map((neighbourhood) => {
              return <MenuItem value={neighbourhood}>{neighbourhood}</MenuItem>;
            })}
      </Select>
      <Select
        value={mode}
        onChange={(event) => {
          setMode(event.target.value);
        }}
        style={{
          position: "absolute",
          top: "9.5rem",
          right: "1rem",
          zIndex: 1000,
          background: "white",
        }}
        variant="outlined"
        defaultValue={"Light"}
      >
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="light">Light</MenuItem>
      </Select>
      <MapContainer
        center={[53.5280968, -113.5276029]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "calc(100vh - 4rem)" }}
      >
        <TileLayer
          url={
            mode === "light"
              ? "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          }
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
