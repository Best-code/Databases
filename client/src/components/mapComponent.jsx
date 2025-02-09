// components/mapComponent.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayerGroup } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import formatTime from './utils/formatTime';
import L from "leaflet"

const MapComponent = () => {
    const [geoJson, setGeoJson] = useState(null);
    const [loading, setLoading] = useState(false);

    // fetch GeoJSON data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:4242/viirs-public"); 
                
                const geoJsonData = response.data.rows[0].geojson; //all public geogjson tables serve geojson on row 0
                    
                console.log("Processed GeoJSON data:", geoJsonData);
                setGeoJson(geoJsonData);
            } catch (error) {
                console.error("Error getting GeoJSON:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    //color for spots
    const geoJSONStyle = {
        color: '#ff7800',
        weight: 2,
        opacity: 0.65
    };

    const startPosition = { position: [30.4383, -84.2807], zoomLevel: 6 };

    return (
        <MapContainer
            center={startPosition.position}
            zoom={startPosition.zoomLevel}
            style={{ height: "100vh", width: "100%" }}
            maxBounds={L.latLngBounds([[-20 , 0], [ 90,-180]])}
            minZoom={4}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {geoJson && geoJson.features && (
                <LayerGroup>
                    <GeoJSON 
                        key={JSON.stringify(geoJson)}
                        data={geoJson}
                        style={geoJSONStyle}
                        onEachFeature={(feature, layer) => {
                            if (feature.properties) {
                                layer.bindPopup(`
                                    <div>
                                        <h4>Potential Hotspot</h4>
                                        <p>Date: ${feature.properties.acq_date}</p>
                                        <p>Time: ${formatTime(feature.properties.acq_time)}</p>
                                    </div>
                                `);
                            }
                            layer.on({
                                mouseover: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                        weight: 5,
                                        color: '#666',
                                        dashArray: '',
                                        fillOpacity: 0.7
                                    });
                                },
                                mouseout: (e) => {
                                    const layer = e.target;
                                    layer.setStyle(geoJSONStyle);
                                }
                            });
                        }}
                    />
                </LayerGroup>
            )}
        </MapContainer>
    );
};

export default MapComponent;