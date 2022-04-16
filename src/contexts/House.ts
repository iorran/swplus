import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import uuid from "react-native-uuid";

export type IHouseAtom = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  createdAt: string;
};

export const HOUSE_ATOM = atom<Array<IHouseAtom>>([]);

export const useHouseStore = () => {

  const setHouses = useUpdateAtom(HOUSE_ATOM);
  const houses = useAtomValue(HOUSE_ATOM);

  const exists = (name: string) => houses.find(house => house.name === name);
  const removeByLatLng = (lat: number, lng: number) => houses.filter(house => (house.lat !== lat && house.lng !== lng));

  const save = (newHouse: any) => {
    let found = exists(newHouse.imovel)
    if (!found) {
      const id = uuid.v4().toString();
      const createdAt = new Date().toISOString();
      setHouses(houses => [...houses, { ...newHouse, id, name: newHouse.imovel, createdAt }]);
      return;
    }
    setHouses([...removeByLatLng(found.lat, found.lng), newHouse]);
  };

  const remove = (lat: number, lng: number) => {
    setHouses(removeByLatLng(lat, lng))
  };

  return { save, remove, houses }
}