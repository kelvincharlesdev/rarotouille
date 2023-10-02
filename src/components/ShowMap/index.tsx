import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { UserResponseType } from "../../types/UserResponseType";
import { TelephoneType } from "../../types/TelephoneType";
import { AddressResponseType } from "../../types/AddressResponseType";
import { getMapOptions } from "../../utils/map";

const chaveMapAPI = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

interface IShowMap {
  chefs: IChefResponse[];
  user: UserResponseType;
}

export interface IChefResponse {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  address: AddressResponseType;
  telephones?: TelephoneType[];
}

export const ShowMap = ({ chefs, user }: IShowMap) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const DEFAULT_LATITUDE = -19.95102;
  const DEFAULT_LONGITUDE = -43.92111;

  const hasUserAddress =
    user?.addresses?.[0]?.latitude !== undefined &&
    user?.addresses?.[0]?.longitude !== undefined;

  const userAddress = {
    latitude: user?.addresses?.[0]?.latitude,
    longitude: user?.addresses?.[0]?.longitude
  };

  const position = useMemo(() => {
    return hasUserAddress
      ? {
          lat: userAddress.latitude || DEFAULT_LATITUDE,
          lng: userAddress.longitude || DEFAULT_LONGITUDE
        }
      : {
          lat: DEFAULT_LATITUDE,
          lng: DEFAULT_LONGITUDE
        };
  }, [hasUserAddress, userAddress]);

  const onLoad = (map: google.maps.Map | null) => {
    if (map) {
      map.setZoom(13);
      setMap(map);
    }
  };

  const onUnmount = () => {
    setMap(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: chaveMapAPI,
    libraries: ["places", "geometry"]
  });

  const rootStyles = getComputedStyle(document.documentElement);

  const primaryColor = rootStyles.getPropertyValue("--primary");
  const mapColor = rootStyles.getPropertyValue("--map");
  const waterMap = rootStyles.getPropertyValue("--checkbox");
  const chefIcon = "src/assets/images/LogoHat.png";

  const mapOptions = getMapOptions({ waterMap, mapColor, primaryColor });

  return (
    <>
      <section className={styles.contentMap}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={position}
            options={mapOptions}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {hasUserAddress && (
              <Marker
                key={"user-location"}
                position={position}
                label={{
                  text: "Sua Localização",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: waterMap
                }}
              />
            )}
            {chefs.length > 0 &&
              chefs.map(chef =>
                chef.address &&
                chef.address.latitude !== undefined &&
                chef.address.longitude !== undefined ? (
                  <Marker
                    key={"marker_" + chef.id}
                    position={{
                      lat: chef.address.latitude,
                      lng: chef.address.longitude
                    }}
                    icon={{
                      url: chefIcon,
                      anchor: new google.maps.Point(25, 50),
                      labelOrigin: new google.maps.Point(25, -10),
                      scaledSize: new google.maps.Size(50, 50)
                    }}
                    label={{
                      text: chef.name,
                      fontSize: "14px",
                      fontWeight: "700",
                      color: waterMap
                    }}
                  />
                ) : (
                  ""
                )
              )}
          </GoogleMap>
        ) : null}
      </section>
    </>
  );
};
