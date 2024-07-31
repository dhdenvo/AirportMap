import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson";

const App = () => {
  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <ComposableMap>
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
      </ComposableMap>
    </div>
  );
};

export default App;
