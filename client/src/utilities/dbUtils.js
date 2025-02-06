export const coordinateParser = (coords) => {
    return JSON.stringify(coords).replaceAll("[", "").replaceAll("]", "").split(',')
}

export const GeoJsonBreakdown = (JsonString) => {
    try {
        console.log("GeoJSON String before parsing:", JsonString);
        const geojsonObject = JSON.parse(JsonString); // convert string to object
        console.log("Parsed GeoJSON Object:", geojsonObject);
        
        return {
            type: geojsonObject?.type,
            geometry: geojsonObject?.geometry,  // keep the original structure
            properties: geojsonObject?.properties, // keep properties
        };
    } catch (error) {
        console.error("JSON Parse Error:", error, "for row:", JsonString);
        return null; // return null if it fails
    }
};

// export const GeoJsonBreakdown = (JsonArray) => {
//     JsonArray.map((row, key) => {
//         try {
//             const geojsonObject = JSON.parse(row.geojson); // Convert string to object
//             return (
//                 <div key={key}>
//                     <p>Type: {geojsonObject?.type}</p>
//                     <p>Geometry Type: {geojsonObject?.geometry?.type}</p>
//                     <p className="">Coordinates:
//                         {coordinateParser(geojsonObject?.geometry?.coordinates[0]).map((coord, key) => (
//                             <p key={key}>
//                                 <pre> {coord} </pre>
//                             </p>
//                         ))}
//                     </p>
//                     <p>Country ID: {geojsonObject?.properties?.country_id}</p>
//                     <p>Latitude: {geojsonObject?.properties?.latitude}</p>
//                     <p>Longitude: {geojsonObject?.properties?.longitude}</p>
//                     <hr />
//                 </div>
//             );
//         } catch (error) {
//             console.error("JSON Parse Error:", error, "for row:", row);
//             return <p key={key}>Invalid geojson format</p>;
//         }
//     }
// )}