// AIzaSyDenVRxkWO6OP8EC_GFtMM86YcHYRnyaek
// import { useState} from "react";
import {Map,Marker,GoogleApiWrapper} from 'google-maps-react';

function CustomMap({ google, locations = [] }:any) {
    
    // const [google, setGoogle] = useState<any[]>([]);
    console.log("loc ",locations);
    // const [center, setCenter] = useState({
       
    //   });
    // setCenter({lat: 51.4694976807,
    //     lng: -0.0493916683})
    return (
        <Map
            google={google}
            containerStyle={{
                position: "static",
                width: "100%",
                height: "100%"
            }}
            style={{
                width: "90%",
                height: "80%"
            }}
            center={{lat: 51.4694976807,
                lng: -0.0493916683}}
            // initialCenter={locations[0].location}
            zoom={locations.length === 1 ? 18 : 13}
            disableDefaultUI={true}
        >
            {locations.map(
                (coords:any) => <Marker position={coords.location} />
            )}
        </Map>
    )
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDenVRxkWO6OP8EC_GFtMM86YcHYRnyaek',
})(CustomMap);
