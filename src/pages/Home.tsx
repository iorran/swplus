import React, { useState } from "react";
import MapView, { MapEvent, MapTypes, Polyline } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useLocation } from "../hooks/useLocation";

import DotMarker from "../components/markers/DotMarker";
import MeMarker from "../components/markers/MeMarker";
import HouseForm from "../components/houses/HouseForm";
import { useAtomValue } from "jotai/utils";
import { CURRENT_TOOL_ATOM } from "../contexts/Tool";
import { useDotMarker } from "../contexts/Dot";
import { useLineMarker } from "../contexts/Line";
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import { Box } from "native-base";

export default function Home() {
  const currentLocation = useLocation();
  const currentTool = useAtomValue(CURRENT_TOOL_ATOM);
  const { addDotMarker, dotMarkers } = useDotMarker();
  const { addLineMarker, lineMarkers } = useLineMarker();

  const [mapType] = useState<MapTypes>("satellite");

  function handleLongPress(mapEvent: MapEvent) {
    if (currentTool === "dot") addDotMarker(mapEvent.nativeEvent.coordinate);
    if (currentTool === "line") addLineMarker(mapEvent.nativeEvent.coordinate);
  }

  if (!currentLocation) {
    return <Loader />;
  }

  return (
    <Box>
      <MapView
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={handleLongPress}
      >
        <MeMarker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
        />
        {dotMarkers?.map(({ id, latitude, longitude, onRemove }) => (
          <DotMarker
            key={id}
            id={id}
            latitude={latitude}
            longitude={longitude}
            onRemove={onRemove}
          >
            <HouseForm latitude={latitude} longitude={longitude} />
          </DotMarker>
        ))}
        {lineMarkers.map((lineMarker) => (
          <Polyline
            key={lineMarker.id}
            coordinates={lineMarker.coordinates}
            strokeColor="#000"
            strokeWidth={2}
          />
        ))}
      </MapView>
      <Menu />
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
