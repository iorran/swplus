import React, { useState } from "react";
import MapView, { MapEvent, MapTypes, Polyline } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { useLocation } from "./src/hooks/useLocation";

import DotMarker from "./src/components/markers/DotMarker";
import MeMarker from "./src/components/markers/MeMarker";
import HouseForm from "./src/components/houses/HouseForm";
import Menu from "./src/components/Menu";
import { useAtomValue } from "jotai/utils";
import { CURRENT_TOOL_ATOM } from "./src/contexts/Tool";
import { useDotMarker } from "./src/contexts/Dot";
import { useLineMarker } from "./src/contexts/Line";
import Panel from "./src/components/Panel";

export default function App() {
  const currentLocation = useLocation();
  const currentTool = useAtomValue(CURRENT_TOOL_ATOM);
  const { addDotMarker, dotMarkers } = useDotMarker();
  const { addLineMarker, lineMarkers } = useLineMarker();

  const [mapType] = useState<MapTypes>("satellite");

  function handleLongPress(mapEvent: MapEvent) {
    console.log(mapEvent.nativeEvent.coordinate, currentTool);
    if (currentTool === "dot") addDotMarker(mapEvent.nativeEvent.coordinate);
    if (currentTool === "line") addLineMarker(mapEvent.nativeEvent.coordinate);
  }

  if (!currentLocation) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        mapType={mapType}
        style={styles.map}
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
            <HouseForm />
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

      <Panel />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
