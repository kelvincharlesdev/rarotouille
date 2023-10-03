interface IGetMapOptions {
  primaryColor: string;
  mapColor: string;
  waterMap: string;
}

export const getMapOptions = ({
  primaryColor,
  mapColor,
  waterMap
}: IGetMapOptions) => {
  return {
    disableDefaultUI: false,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: waterMap }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: mapColor }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: primaryColor }]
      }
    ]
  };
};
