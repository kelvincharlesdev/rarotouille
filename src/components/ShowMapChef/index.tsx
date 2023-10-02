// ====================================================================================================================================

// import styles from "./styles.module.css";
// import { useMemo, useState } from "react";
// import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

// import { UserResponseType } from "../../types/UserResponseType";
// import { TelephoneType } from "../../types/TelephoneType";
// import { AddressResponseType } from "../../types/AddressResponseType";
// import { getMapOptions } from "../../utils/map";

// const chaveMapAPI = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

// interface IShowMap {
//   chef: IChefResponse;
//   user: UserResponseType;
// }

// export interface IChefResponse {
//   id: string;
//   name: string;
//   email: string;
//   created_at?: string;
//   updated_at?: string;
//   address: AddressResponseType;
//   telephones?: TelephoneType[];
// }

// export const ShowMapChef = ({ chef, user }: IShowMap) => {
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   const DEFAULT_LATITUDE = -19.95102;
//   const DEFAULT_LONGITUDE = -43.92111;

//   const hasUserAddress =
//     user?.addresses?.[0]?.latitude !== undefined &&
//     user?.addresses?.[0]?.longitude !== undefined;

//   const userAddress = {
//     latitude: user?.addresses?.[0]?.latitude,
//     longitude: user?.addresses?.[0]?.longitude
//   };

//   const position = useMemo(() => {
//     return hasUserAddress
//       ? {
//           lat: userAddress.latitude || DEFAULT_LATITUDE,
//           lng: userAddress.longitude || DEFAULT_LONGITUDE
//         }
//       : {
//           lat: DEFAULT_LATITUDE,
//           lng: DEFAULT_LONGITUDE
//         };
//   }, [hasUserAddress, userAddress]);

//   const onLoad = (map: google.maps.Map | null) => {
//     if (map) {
//       map.setZoom(14);
//       setMap(map);
//     }
//   };

//   const onUnmount = () => {
//     setMap(null);
//   };

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: chaveMapAPI,
//     libraries: ["places"]
//   });

//   const rootStyles = getComputedStyle(document.documentElement);

//   const primaryColor = rootStyles.getPropertyValue("--primary");
//   const mapColor = rootStyles.getPropertyValue("--map");
//   const waterMap = rootStyles.getPropertyValue("--checkbox");
//   const userIcon = "src/assets/images/UserIcon.png";
//   const chefIcon = "src/assets/images/LitleMap.png";

//   const mapOptions = getMapOptions({ waterMap, mapColor, primaryColor });

//   return (
//     <>
//       <section className={styles.contentMap}>
//         <div className={styles.contentMap}>
//           {isLoaded ? (
//             <GoogleMap
//               mapContainerStyle={{ width: "100%", height: "100%" }}
//               center={position}
//               options={mapOptions}
//               zoom={14}
//               onLoad={onLoad}
//               onUnmount={onUnmount}
//             >
//               <MarkerF
//                 key={"user-location"}
//                 position={position}
//                 icon={{
//                   url: userIcon,
//                   anchor: new google.maps.Point(25, 50),
//                   labelOrigin: new google.maps.Point(25, -10),
//                   scaledSize: new google.maps.Size(50, 50)
//                 }}
//                 label={{
//                   text: "Sua Localização",
//                   fontSize: "20px",
//                   fontWeight: "700",
//                   color: waterMap
//                 }}
//               />
//               <MarkerF
//                 key={"marker_" + chef.id}
//                 position={{
//                   lat: chef.address.latitude,
//                   lng: chef.address.longitude
//                 }}
//                 icon={{
//                   url: chefIcon,
//                   anchor: new google.maps.Point(25, 50),
//                   labelOrigin: new google.maps.Point(25, -10),
//                   scaledSize: new google.maps.Size(50, 50)
//                 }}
//                 label={{
//                   text: chef.name,
//                   fontSize: "14px",
//                   fontWeight: "700",
//                   color: waterMap
//                 }}
//               />
//             </GoogleMap>
//           ) : null}
//         </div>
//       </section>
//     </>
//   );
// };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import styles from "./styles.module.css";
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

import { UserResponseType } from "../../types/UserResponseType";
import { TelephoneType } from "../../types/TelephoneType";
import { AddressResponseType } from "../../types/AddressResponseType";
import { getMapOptions } from "../../utils/map";

const chaveMapAPI = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

interface IShowMap {
  chef: IChefResponse;
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

export const ShowMapChef = ({ chef, user }: IShowMap) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [mapLoaded] = useState(true);

  useEffect(() => {
    if (
      mapLoaded &&
      chef.address.latitude !== undefined &&
      chef.address.longitude !== undefined &&
      user?.addresses?.[0]?.latitude !== undefined &&
      user?.addresses?.[0]?.longitude !== undefined
    ) {
      const userLocation = new google.maps.LatLng(
        user.addresses[0].latitude,
        user.addresses[0].longitude
      );
      const chefLocation = new google.maps.LatLng(
        chef.address.latitude,
        chef.address.longitude
      );

      const response = google.maps.geometry.spherical.computeDistanceBetween(
        userLocation,
        chefLocation
      );
      console.log("response:", response);
      setDistance(response / 1000);
    }
  }, [mapLoaded, chef, user]);

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
  const userIcon = "src/assets/images/UserIcon.png";
  const chefIcon = "src/assets/images/LitleMap.png";

  const mapOptions = getMapOptions({ waterMap, mapColor, primaryColor });

  return (
    <>
      <section className={styles.contentMap}>
        {distance !== null && (
          <p className={styles.distance}>
            Está à apenas
             <span className={styles.span}>{distance.toFixed(2)}</span> km de
            distancia
          </p>
        )}

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={position}
            options={mapOptions}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <MarkerF
              key={"user-location"}
              position={position}
              icon={{
                url: userIcon,
                anchor: new google.maps.Point(25, 50),
                labelOrigin: new google.maps.Point(25, -10),
                scaledSize: new google.maps.Size(50, 50)
              }}
              label={{
                text: "Sua Localização",
                fontSize: "20px",
                fontWeight: "700",
                color: waterMap
              }}
            />
            <MarkerF
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
          </GoogleMap>
        ) : null}
      </section>
    </>
  );
};
