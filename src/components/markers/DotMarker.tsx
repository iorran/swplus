import React from "react";
import { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import RemovableCallout from "../callouts/RemovableCallout";

type DotMarkerProps = {
  id: string;
  latitude: number;
  longitude: number;
  children?: React.ReactNode;
  onRemove: (latitude: number, longitude: number) => void;
};

export default function DotMarker({
  latitude,
  longitude,
  children,
  onRemove,
}: DotMarkerProps) {
  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Entypo name="dot-single" size={64} color="black" />
      <RemovableCallout action={() => onRemove(latitude, longitude)}>
        {children}
      </RemovableCallout>
    </Marker>
  );
}
