import 'leaflet/dist/leaflet.css'
import "leaflet"
import axios from "axios"

export function initialize_map (id , tileUrl , attribution , minZoom , maxBounds , zoom , center){
    var map = L.map(id , {zoomDelta : 0.25, minZoom : minZoom , maxBounds : maxBounds,
        zoom : zoom , center: center , style : { height: "100vh", width: "100vw" }});

    var tiles = L.tileLayer(tileUrl, {attribution : attribution});

    tiles.addTo(map);

    return {"tiles": tiles , "map" : map};
}

export async function getGeojson(url){
    
    var features = await axios.get(url); 
    
    var features= features.data.rows[0].geojson;

    return features;
}

export function addLayer(map , layer){
    return layer.addTo(map);
}

export function removeLayer(map , layer){
    return map.removeLayer(layer);
}

