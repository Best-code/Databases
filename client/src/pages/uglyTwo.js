import React, { useState, useEffect } from "react";
import axios from "axios";
import { coordinateParser, GeoJsonBreakdown } from "../utilities/dbUtils";


const UglyTwo = () => {
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



    return (
        <>
            <h1>Practice</h1>
            {Loading ?
                (
                    <h4>Loading...</h4>
                ) : (
                    GeoJson.map((row, key) => {
                        try {
                            const {type, geometryType, coordinates, countryID, latitude, longitude} = GeoJsonBreakdown(row.geojson); 
                            return (
                                <div key={key}>
                                    <p>Type: {type}</p>
                                    <p>Geometry Type: {geometryType}</p>
                                    <p className="">Coordinates:
                                        {coordinateParser(coordinates).map((coord, key) => (
                                            <p key={key}>
                                                <pre> {coord} </pre>
                                            </p>
                                        ))}
                                    </p>
                                    <p>Country ID: {countryID}</p>
                                    <p>Latitude: {latitude}</p>
                                    <p>Longitude: {longitude}</p>
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

export default UglyTwo;



// [[76.821187991, 39.935826958], [76.818852142, 39.942249473], [76.810296565, 39.940370546], [76.812633141, 39.933948264], [76.821187991, 39.935826958]]