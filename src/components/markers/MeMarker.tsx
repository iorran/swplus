import React from "react";
import { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";

export type DotMarkerProps = {
  latitude: number;
  longitude: number;
};

export default function DotMarker({ latitude, longitude }: DotMarkerProps) {
  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Entypo name="location-pin" size={24} color="black" />
    </Marker>
  );
}
