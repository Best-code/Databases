export const coordinateParser = (coords) => {
    return JSON.stringify(coords).replaceAll("[", "").replaceAll("]", "").split(',')
}

export const GeoJsonBreakdown = (JsonString) => {
    try {
        const geojsonObject = JSON.parse(JsonString); // Convert string to object
        return {
            type: geojsonObject?.type,
            geometryType: geojsonObject?.geometry?.type,
            coordinates: coordinateParser(geojsonObject?.geometry?.coordinates[0]),
            countryID: geojsonObject?.properties?.country_id,
            latitude: geojsonObject?.properties?.latitude,
            longitude: geojsonObject?.properties?.longitude,
        }
    } catch (error) {
        console.error("JSON Parse Error:", error, "for row:", JsonString);
    }
}

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