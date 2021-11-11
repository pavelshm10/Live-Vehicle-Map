import { useState, useEffect } from "react";
import "./App.css";
import CustomMap from "./Components/Map/CustomMap";
// import { Vehicles } from "./Types/vehicle_enum";
// import Vehicle from "./Components/Vehicle/Vehicle";
// import MyMapComponent from "./Components/Map/CustomMap";
// import {MapContainer} from "./Components/Map/CustomMap";
// import MapContainer from "./Components/Map/CustomMap";
// import GoogleMapReact from "google-map-react";

function App() {
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);
  // const mapStyles = {
  //   width: '100%',
  //   height: '100%'
  // };
  const [locations, setLocations] = useState<any[]>([]);
	useEffect(() => {
		setTimeout(() => {
			fetch("http://localhost:3000/testApi")
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw Error("could not fetch the data for that resource");
					}
				})
				.then((response: any) => {
					// console.log(response);
          setLocations(response);
          // setVehicles(response);
					// setLoading(false);
					// setError(null);
				})
				.catch((err: any) => {
					console.log(err.message);
					// setLoading(false);
					// setError(err.message);
				});
		}, 1000);
	});

	return (
		<div className="App">
		  <CustomMap locations={locations}/>
    </div>
)};

export default App;

