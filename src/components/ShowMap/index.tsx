import styles from "./styles.module.css";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import "./style.css";

// export const ShowMap = () => {
//   const chaveMapAPI = "AIzaSyB0olG_WHFt92MdcWXViOSYB-v57OSfIoE";
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: chaveMapAPI
//   });

//   const position = {
//     lat: -25.45833932936462,
//     lng: -49.28526645986307
//   };

//   return (
//     <div className={styles.contentMap}>
//       {isLoaded ? (
//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           center={position}
//           zoom={15}
//           options={{ disableDefaultUI: true }}
//           //   onLoad={onLoad}
//           //   onUnmount={onUnmount}
//         >
//           <Marker
//             position={position}
//             options={{
//               label: {
//                 text: " Posição Teste",
//                 className: "map-marker"
//               }
//             }}
//           />
//         </GoogleMap>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerF
} from "@react-google-maps/api";

import { UserResponseType } from "../../types/UserResponseType";

const chaveMapAPI = "AIzaSyB0olG_WHFt92MdcWXViOSYB-v57OSfIoE";

interface IShowMap {
  chefs: UserResponseType[];
  user?: UserResponseType;
}

export const ShowMap = ({ chefs, user }: IShowMap) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // const [userLocation, setUserLocation] = useState(position);

  const position = {
    lat: user?.address.latitude,
    lng: user?.address.longitude
  };

  const onLoad = map => {
    if (map) {
      map.setZoom(14);
      setMap(map);

      // navigator.geolocation.getCurrentPosition(function (position) {
      //   const userLocation = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude
      //   };

      //   map.panTo(userLocation);
      // });
    }
  };

  const onUnmount = () => {
    setMap(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: chaveMapAPI
  });

  // useEffect(() => {
  //   if (user && user.address.latitude && user.address.longitude) {
  //     setUserLocation({
  //       lat: user.address.latitude,
  //       lng: user.address.longitude
  //     });
  //   }
  //   console.log("user aqui", userLocation);
  // }, [user]);

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
              text: "Usuario",
              fontSize: "20px",
              fontWeight: "700",
              color: "red"
            }}
          />
          {chefs.length
            ? chefs.map(chef =>
                chef.address &&
                chef.address.latitude &&
                chef.address.longitude ? (
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
                ) : (
                  ""
                )
              )
            : ""}
        </GoogleMap>
      ) : null}
    </div>
  );
};

// useEffect(() => {
//   if (map && user) {
//     // Configure o mapa para centralizar na localização do usuário
//     map.setCenter({ lat: user.latitude, lng: user.longitude });
//   }
// }, [map, user]);
