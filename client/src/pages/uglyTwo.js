import React, { useState, useEffect } from "react";
import axios from "axios";
import { GeoJsonBreakdown } from "../utilities/dbUtils";
import MapComponent from "../components/mapComponent";

const UglyTwo = () => {
    const [GeoJson, setGeoJson] = useState({ type: "FeatureCollection", features: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                console.log("Making API request...");
                const response = await axios.get("http://localhost:4242/public");

                const geoJsonData = {
                    type: "FeatureCollection",
                    features: response.data.rows.map(row => {
                        console.log("Raw geojson string:", row.eojson);
                        const parsedFeature = GeoJsonBreakdown(row.Geojson);
                        console.log("Parsed feature:", parsedFeature);
                        return parsedFeature;
                    }),
                };

                console.log("Final GeoJSON data:", geoJsonData);
                setGeoJson(geoJsonData);
            } catch (error) {
                console.error("Error getting GeoJSON:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <MapComponent geoJson={GeoJson} />;
};

export default UglyTwo;