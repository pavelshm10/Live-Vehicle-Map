import { useState, useEffect } from "react";
import "./App.css";
import CustomMap from "./Components/Map/CustomMap";

function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  	const [locations, setLocations] = useState<any[]>([]);
	// useEffect(() => {
		// setTimeout(() => {
			// fetch("/allIds")
			// 	.then((response) => {
          	// 	if (response.ok) {
			// 		return response.json();
			// 			} else {
			// 				throw Error("could not fetch the data for that resource");
			// 			}
			// 	})
			// 	.then((response: any) => {
          	// 		console.log("in");
			// 		setLocations(response);
			// 		setLoading(false);
			// 		setError(null);
			// 	})
			// 	.catch((err: any) => {
			// 		console.log(err.message);
			// 		setLoading(false);
			// 		setError(err.message);
			// 	});
		// }, 1000);
	// });

	return (
		<div className="App" style={{ width: 300, height: 300 }}>
		 
      <CustomMap/>
    </div>
)};

export default App;

