import React, {Fragment, useState} from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer
} from "@react-google-maps/api";

const containerStyle = {
  width: '1570px',
  height: '750px'
};

const icon = {
  path:
    "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
  fillColor: "#0000ff",
  fillOpacity: 1.0,
  strokeWeight: 0,
  scale: 1.25
};

function Map() {
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 48.85726111835348, lng: 2.3521900177001953 });
  const [zoom, setZoom] = useState(13);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  // add REACT_APP_MAP_KEY=YOUR_KEY in .env file to enable google map api
  var key = process.env.REACT_APP_MAP_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey : key
  })

  const myPlaces = [
    { id: "Eiffel", pos: { lat: 48.85909008666185, lng: 2.2943954693184945 } },
    { id: "Cathédrale", pos: { lat: 48.85377327844031, lng: 2.351058960516809 } },
    { id: "Louvre", pos: { lat: 48.86177132300687, lng: 2.3382956688785748 } },
    { id: "Triomphe", pos: { lat: 48.87497779760546, lng: 2.2968270196567993 } }
  ];

  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();

    myPlaces.forEach(place => {
      bounds.extend(place.pos);
    });

    map.fitBounds(bounds);
  };

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  const unmountHandler = React.useCallback(function callback(map) {
    setMapRef(null)
  }, [])

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);
    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
    // zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }
    // center the selected Marker
    setCenter(place.pos)
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          // Do stuff on map initial laod
          onLoad={loadHandler}
          onUnmount={unmountHandler}
          // Save the current center position in state
          // onCenterChanged={() => setCenter(mapRef.getCenter().toJSON())}
          // Save the user's map click position
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={containerStyle}
        >
          <MarkerClusterer>
            {clusterer =>
                myPlaces.map(place => (
                  <Marker
                    key={place.id}
                    clusterer={clusterer}
                    position={place.pos}
                    onLoad={marker => markerLoadHandler(marker, place)}
                    onClick={event => markerClickHandler(event, place)}
                    icon={icon}
                  />
                ))
              }
          </MarkerClusterer>

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.id]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h3>{selectedPlace.id}</h3>
                <div>Test test</div>
              </div>
            </InfoWindow>
          )}

        </GoogleMap>
        <h3>
          Center {center.lat}, {center.lng}
        </h3>

        {clickedLatLng && (
          <h3>
            You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )}

        {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>}
      </Fragment>
    )
  }

  if (loadError) {
      return <div>Map cannot be loaded right now, please try again later.</div>
  } else {
      return isLoaded ? renderMap() : null
  }    
}

export default Map;