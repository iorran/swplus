import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { LatLng } from "react-native-maps";

export const useLocation = () => {
  const [location, setLocation] = useState<LatLng>(); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
    })();
  }, [location]);

  return location;
}