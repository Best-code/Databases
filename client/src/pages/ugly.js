import React, { useState, useEffect } from "react";
import axios from "axios";


const Ugly = () => {
    const [GeoJson, setGeoJson] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {

            setLoading(true);

            const response = await axios.get(
                "http://localhost:4242/public", { withCredentials: true }
            );

            setGeoJson(response.data.rows);

            setLoading(false);
        }

        loadData();
    }, [])

    const coordinateParser = (coords) => {
        return JSON.stringify(coords).replaceAll("[", "").replaceAll("]", "").split(',')
    }

    return (
        <>
            <h1>Practice</h1>
            {Loading ?
                (
                    <h4>Loading...</h4>
                ) : (
                    GeoJson.map((row, key) => {
                        try {
                            const geojsonObject = JSON.parse(row.geojson); // Convert string to object
                            return (
                                <div key={key}>
                                    <p>Type: {geojsonObject?.type}</p>
                                    <p>Geometry Type: {geojsonObject?.geometry?.type}</p>
                                    <p className="">Coordinates:
                                        {coordinateParser(geojsonObject?.geometry?.coordinates[0]).map((coord, key) => (
                                            <p key={key}>
                                                <pre> {coord} </pre>
                                            </p>
                                        ))}
                                    </p>
                                    <p>Country ID: {geojsonObject?.properties?.country_id}</p>
                                    <p>Latitude: {geojsonObject?.properties?.latitude}</p>
                                    <p>Longitude: {geojsonObject?.properties?.longitude}</p>
                                    <hr />
                                </div>
                            );
                        } catch (error) {
                            console.error("JSON Parse Error:", error, "for row:", row);
                            return <p key={key}>Invalid geojson format</p>;
                        }
                    })
                )}
        </>
    );
};

export default Ugly;



// [[76.821187991, 39.935826958], [76.818852142, 39.942249473], [76.810296565, 39.940370546], [76.812633141, 39.933948264], [76.821187991, 39.935826958]]