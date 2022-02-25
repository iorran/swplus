import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useState } from 'react';
import { LatLng } from 'react-native-maps';
import uuid from "react-native-uuid";

export type ILinesAtom = {
    id: string;
    coordinates: Array<LatLng>
    status: "editing" | "done"
};

export const LINES_ATOM = atom<Array<ILinesAtom>>([]);

export const useLineMarker = () => {
  const [currentLineId, setCurrentLineId] = useState<string>();
  const setLineMakers = useUpdateAtom(LINES_ATOM);
  const lineMarkers = useAtomValue(LINES_ATOM);

  function addLineMarker({ latitude, longitude }: LatLng): void {
    if(!currentLineId) {
      const id = uuid.v4().toString();
      const newMarker: ILinesAtom = {
        id,
        coordinates: [{latitude, longitude}],
        status: "editing"
      };
  
      setCurrentLineId(id)
      setLineMakers([...lineMarkers, newMarker]);
      return;
    } 

    const newLineMarkers = lineMarkers.map(lineMarker => {
      if( lineMarker.id === currentLineId){
        return { ...lineMarker, coordinates: [...lineMarker.coordinates, {latitude, longitude}]}
      }
      return lineMarker;
    });

    setLineMakers(newLineMarkers)
  }

  function done() {
    setCurrentLineId(undefined);
  }

  function undo() {
    setLineMakers(lineMarkers.splice(-1));
  }

  return { addLineMarker, done, undo, lineMarkers }
}