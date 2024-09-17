import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import FileUpload from "./FileUpload";
import geographies from "./assets/canada.json";
import airports from "./assets/airports.json";

const extractAirportCodes = (input) => {
  const regex = /\b(?:C([A-Z]{3})|([A-Z]{3}))\b/g;
  const codes = [];
  let match;

  while ((match = regex.exec(input)) !== null)
    if (match[1]) codes.push(match[1]);
    else codes.push(match[2]);

  return codes;
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const existingMarkers = {};
    const newLines = [];
    data
      .filter((row) =>
        Object.values(row).some((v) =>
          v.toLowerCase().includes(filter.toLowerCase())
        )
      )
      .forEach(({ FROM, TO, REMARKS }) => {
        const path = [FROM, REMARKS, TO]
          .map(extractAirportCodes)
          .flat()
          .map((code) => {
            const airport = airports.find(({ iata }) => iata === code);
            if (!airport) return;
            const name = code;
            const coords = [airport.lon, airport.lat];
            existingMarkers[name] = coords;
            return { name, coords };
          })
          .filter((x) => x);

        let i = 0;
        while (i < path.length - 1) {
          newLines.push({ from: path[i], to: path[i + 1] });
          i++;
        }
      });
    setMarkers(
      Object.entries(existingMarkers).map(([name, coords]) => ({
        name,
        coords,
      }))
    );
    setLines(newLines);
  }, [data, filter]);

  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
        border: "2px solid black",
      }}
    >
      <ComposableMap
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ center: [-94, 58], scale: 1100 }}
      >
        <ZoomableGroup>
          <Geographies geography={geographies}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {lines.map(({ to, from }) => (
            <Line
              to={to.coords}
              from={from.coords}
              strokeLinecap="round"
              strokeWidth={1}
              key={`${to.name}-${from.name}-${Math.floor(
                Math.random() * 1000000
              )}`}
            />
          ))}
          {markers.map(({ name, coords }) => (
            <Marker coordinates={coords} key={name}>
              <circle r={1} fill="#5D5A6D" />
              <text
                textAnchor="middle"
                y={-3}
                style={{
                  fontFamily: "system-ui",
                  fill: "#5D5A6D",
                  fontSize: "50%",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
        {"Filter: "}
        <input
          type="text"
          id="name"
          name="name"
          onChange={({ target }) => setFilter(target.value)}
        />
      </div>
      <FileUpload setData={setData} />
    </div>
  );
};

export default App;
