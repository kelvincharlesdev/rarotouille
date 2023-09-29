import styles from "./styles.module.css";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

import { UserResponseType } from "../../types/UserResponseType";
import { TelephoneType } from "../../types/TelephoneType";
import { AddressResponseType } from "../../types/AddressResponseType";

const chaveMapAPI = "AIzaSyB0olG_WHFt92MdcWXViOSYB-v57OSfIoE";

interface IShowMapChef {
  chef: IChefResponse;
  user: UserResponseType;
}

//TODO TAjeitar tipagem
export interface IChefResponse {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  address: AddressResponseType;
  telephones?: TelephoneType[];
}

export const ShowMapChef = ({ chef, user }: IShowMapChef) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const position = {
    lat: user?.addresses[0].latitude,
    lng: user?.addresses[0].longitude
  };

  const onLoad = map => {
    if (map) {
      map.setZoom(14);
      setMap(map);
    }
  };


  const onUnmount = () => {
    setMap(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: chaveMapAPI
  });

  return (
    <div className={styles.contentMap}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          options={{ disableDefaultUI: true }}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF
            key={"user-location"}
            position={position}
            icon={{
              url: window.location.origin,
              labelOrigin: new google.maps.Point(0, 0)
            }}
            label={{
              //  {   //TODO Consertar para aparecer nome de usuario }
              text: "Usuariooo",
              fontSize: "20px",
              fontWeight: "700",
              color: "red"
            }}
          />
                  <MarkerF
                    key={"marker_" + chef.id}
                    position={{
                      lat: chef.address.latitude,
                      lng: chef.address.longitude
                    }}
                    icon={{
                      url: window.location.origin,
                      labelOrigin: new google.maps.Point(25, -8)
                    }}
                    label={{
                      text: chef.name,
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "red"
                    }}
                  />
        </GoogleMap>
      ) : null}
    </div>
  );
};
