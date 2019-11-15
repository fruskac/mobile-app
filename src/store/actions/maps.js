export const getUserLocation = async (setUserLocation) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setUserLocation(userLocation);
    },
    error => console.log({ error }),
    { enableHighAccuracy: true, timeout: 40000 },
  );
}

export const setWatchPosition = async (setUserLocation) => {
  return navigator.geolocation.watchPosition(
    position => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setUserLocation(userLocation);
    },
    error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

export const getTrack = async (trackUrl, setCenter, setCoordinates) => {
  fetch(trackUrl)
  .then(response => response.text())
  .then(data => {
    const XMLParser = require('react-xml-parser');
    let xml = new XMLParser().parseFromString(data);
    const trkptList = xml.getElementsByTagName('trkseg')[0].children;
    let coordinatesList = [];
    trkptList.forEach(element => {
      let latLngPair = [Number(element.attributes.lon), Number(element.attributes.lat)];
      coordinatesList.push(latLngPair);
    });
    setCenter(coordinatesList[parseInt(coordinatesList.length / 2)]);
    setCoordinates(coordinatesList);
  });
}