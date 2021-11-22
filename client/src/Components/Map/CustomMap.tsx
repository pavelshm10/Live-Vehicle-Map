import { Map, Marker, GoogleApiWrapper, Polygon, InfoWindow } from "google-maps-react";
import React, { useEffect, useRef, useState } from "react";

function CustomMap({ google }: any) {
	const ref = useRef<HTMLDivElement>(null);
	const [center, setCenter] = useState({
		lat: 51.4694976807,
		lng: -0.0493916683,
	});
	var [path, setPath] = useState<any[]>([]);
	var [map, setMap] = useState<google.maps.Map>();
	const [zoom, setZoom] = useState(13);
	const [polygonRef, setPolygonRef] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState<any[]>([]);
    const [allVehicles, setAllVehicles] = useState<any[]>([]);
	let [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [selected, setSelected]= useState<any>(true);
    useEffect(() => {
        getData("/AllIdsBy", "POST",true);
	}, []);

	const onClick = (t: any, map: any, coord: any) => {
		const { latLng } = coord;
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
		polygon.setMap(map);
		setMap(map);
		if (path.length > 2) {
			getData("/IdsByPolygon", "POST",false);
		}
	};

	function getData(url: string, method: string,flag:boolean) {
        fetch(url, {
			method: method,
			headers: {
				"Accept": "application/json",
				"Content-type": "application/json",
			},
			mode: "cors",
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
				setSelected(flag);
				setLoading(false);
				setError(null);
                if(flag){
                    setAllVehicles(response); 
                } 
                setMarkers([]);
                setResponse(response);
			})
			.catch((err: any) => {
				console.log(err.message);
				setLoading(false);
				setError(err.message);
			});
	}

	function Reset(controlDiv: Element, map: any) {
		// Set CSS for the control border.
        const controlUI = document.createElement("div");
		controlUI.style.backgroundColor = "#fff";
		controlUI.style.border = "2px solid #fff";
		controlUI.style.borderRadius = "3px";
		controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
		controlUI.style.cursor = "pointer";
		controlUI.style.marginTop = "8px";
		controlUI.style.marginBottom = "22px";
		controlUI.style.textAlign = "center";
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior.
		const controlText = document.createElement("div");
		controlText.style.color = "rgb(25,25,25)";
		controlText.style.fontFamily = "Roboto,Arial,sans-serif";
		controlText.style.fontSize = "16px";
		controlText.style.lineHeight = "38px";
		controlText.style.paddingLeft = "5px";
		controlText.style.paddingRight = "5px";
		controlText.innerHTML = "Reset Map";
		controlUI.appendChild(controlText);

		// Setup the click event listeners: simply set the map to Chicago.
		controlUI.addEventListener("click", () => {
            setSelected(true);
            for (let i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			setPath([]);
            setMarkers([]);
            setResponse(allVehicles);
		});
	}

	useEffect(() => {
		polygonRef?.setMap(null);
		const polygon = new google.maps.Polygon({
			paths: path,
			strokePosition: google.maps.StrokePosition.CENTER,
			strokeWeight: 1,
			fillOpacity: 0.0,
		});
		setPolygonRef(polygon);
		polygon.setMap(map);
		setMap(map);
	}, [path]);

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
		if (map) {
            const resetDiv = document.createElement("div");
			setMap(map);
			Reset(resetDiv, map);
			map.controls[google.maps.ControlPosition.TOP_CENTER].push(resetDiv);
		}
	}, [ref, map]);

	return (
		<div style={{ fontWeight: "bold" }}>
			Choose Coordinates...
			<Map
				google={google}
				containerStyle={{
					position: "static",
					width: "100%",
					height: "100%",
				}}
				style={{
					width: "100%",
					height: "90%",
					marginTop: "60px",
				}}
				zoomControl={true}
				streetViewControl={true}
				fullscreenControl={true}
				mapTypeControl={true}
				center={center}
				initialCenter={center}
				zoom={zoom}
				disableDefaultUI={true}
				onClick={onClick}
			>
				{response.map((marker) => (
                    selected ?
                    <Marker
					    position= {{lat:marker.location.lat,lng:marker.location.lng}}
					></Marker> :
                    <Marker
                    position= {{lat:marker.location.lat,lng:marker.location.lng}}
                    label= {marker.id}
                    ></Marker>    
                ))}
			</Map>
		</div>
	);
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDenVRxkWO6OP8EC_GFtMM86YcHYRnyaek",
})(CustomMap);
