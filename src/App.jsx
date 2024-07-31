import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import FileUpload from "./FileUpload";

const geoUrl =
  "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson";

const App = () => {
  const [airports, setAirports] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json"
    )
      .then((response) => setAirports(response.json()))
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          <Geographies geography={geoUrl}>
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
          <Marker coordinates={[-79.347015, 43.65107]}>
            <circle r={2} fill="#5D5A6D" />
            <text
              textAnchor="middle"
              y={-3}
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontSize: "50%",
              }}
            >
              Toronto
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
      <FileUpload setData={setData} />
    </div>
  );
};

export default App;
