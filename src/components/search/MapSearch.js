import React, { useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import algoliasearch from 'algoliasearch';
import {Link} from 'react-router-dom'

const client = algoliasearch(
  "JP955S508F",
  "3de80a48e4011b0c171789a11801fb58"
);

const index = client.initIndex('businesses');

const AnyReactComponent = ({ text, id }) => <Link to={`businesses/${id}`}><img className="marker"src = '/color-bean.png'/></Link>;

const MapSearch =()=> {
  let [center, setCenter] = useState({})
  let [markers, setMarkers] = useState([])
  useEffect(()=>{
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    setCenter({lat: crd.latitude, lng: crd.longitude});
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options)
  index.search('', {
    aroundLatLng: `${center.lat}, ${center.lng}`,
    aroundRadius: 10000 // 10 km
  }).then(({ hits }) => {
    hits.forEach(hit=>console.log(hit.objectID));
    setMarkers(hits)
  });
},[center]);

    return (
      center.lng?(
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk'}}
          defaultCenter={center}
          defaultZoom={14}
        >
          {markers.map(marker=>{
            return(
           <AnyReactComponent
           lat = {marker._geoloc.lat}
           lng = {marker._geoloc.lng}
           text= {marker.name}
           id = {marker.objectID}
           />)})}
        </GoogleMapReact>
      </div>):(<h1>loading location...</h1>)
    );
}

export default MapSearch;