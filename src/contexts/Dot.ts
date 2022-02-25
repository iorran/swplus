import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { LatLng } from 'react-native-maps';
import uuid from "react-native-uuid";

export type IDotAtom = {
    id: string;
    latitude: number;
    longitude: number;
    children?: React.ReactNode;
    onRemove: (latitude: number, longitude: number) => void;
};

export const DOTS_ATOM = atom<Array<IDotAtom>>([]);

export const useDotMarker = () => {

  const setDotMarkers = useUpdateAtom(DOTS_ATOM);
  const dotMarkers = useAtomValue(DOTS_ATOM);

  const handleRemoveDotMarker = (latitude: number, longitude: number) => {
    setDotMarkers((currentDotMarkers) =>
      currentDotMarkers.filter(
        (dotMarker) =>
          !(
            dotMarker.latitude === latitude && dotMarker.longitude === longitude
          )
      )
    );
  };

  function addDotMarker({ latitude, longitude }: LatLng): void {
    const newMarker: IDotAtom = {
      id: uuid.v4().toString(),
      latitude,
      longitude,
      onRemove: handleRemoveDotMarker,
    };

    setDotMarkers([...dotMarkers, newMarker]);
  }

  return { addDotMarker, dotMarkers }
}