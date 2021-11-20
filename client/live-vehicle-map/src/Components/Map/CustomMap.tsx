import { getTilesIds } from "google-map-react";
import { Map, Marker, GoogleApiWrapper, Polygon } from "google-maps-react";
import React,{ useEffect, useState } from "react";

function CustomMap({ google }: any) {
    const [center, setCenter] = useState({
		lat: 51.4694976807,
		lng: -0.0493916683,
	});
	var [path, setPath] = useState<any[]>([]);
    var [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(13);
	const [polygonRef, setPolygonRef] = useState<any>(null);
	const [destroy, setDestroy] = useState(false);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  	const [locations, setLocations] = useState<any[]>([]);
    useEffect(() => {
        locations.forEach(item=>{
            var marker = new google.maps.Marker({
                position: item.location,
                map: map,
              });
            marker.setMap(map);
        });
        
    }, [locations]);

    const  onClick=(t: any, map: any, coord: any)=>{            
                const {latLng}  = coord;
                const lat = latLng.lat();
                const lng = latLng.lng();
                path.push({
                    lat: lat,
                    lng: lng,
                });
                polygonRef?.setMap(null);
                const polygon = new google.maps.Polygon({
                    paths: path,
                    strokePosition: google.maps.StrokePosition.CENTER,
                    strokeWeight: 1,
                    fillOpacity: 0.0,
                });
                setPolygonRef(polygon);
                setDestroy(true);
                polygon.setMap(map);
                setMap(map);
                
            if (path.length > 2){
                fetch("/IdsByPolygon", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({ path: path }),
                  })
                	.then((response) => {
          		if (response.ok) {
					return response.json();
						} else {
							throw Error("could not fetch the data for that resource");
						}
				})
				.then((response: any) => {
                    setLocations(response);
					setLoading(false);
					setError(null);
				})
				.catch((err: any) => {
					console.log(err.message);
					setLoading(false);
					setError(err.message);
				});
            }
    };   
      
	return (
            <Map
                google={google}
                containerStyle={{
                    position: "static",
                    width: "100%",
                    height: "100%",
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                center={center}
                initialCenter={center}
                zoom={zoom}
                disableDefaultUI={true}
                onClick={onClick}
            >
            </Map>
	);
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDenVRxkWO6OP8EC_GFtMM86YcHYRnyaek",
})(CustomMap);
