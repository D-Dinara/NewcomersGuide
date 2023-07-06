const fetch = require('node-fetch');

const apiKey = `AIzaSyBrXSJqmXkoCIg6G21YiZluWfolfXNa-2w`;
const searchNearbyPlaces = async (req, res) =>
{
    let result = {result: `error`};
    const postalCode = req.query.postalCode;
    const serviceType = req.query.serviceType||'UnionStation';
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postalCode)}&key=${apiKey}`;
    const url = '';
    try {
        const geocodingResponse = await fetch(geocodingUrl);
        let geocodingResult = await geocodingResponse.json();
        // now need to get near by this geocoding
        const location = geocodingResult.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${latitude},${longitude}&radius=50000&keyword=${encodeURIComponent(serviceType)}`;
        const placesResponse = await fetch(placesUrl);
        let placesResult = await placesResponse.json();
        result = placesResult;
        console.log('response will be sent now');
        result.search_location = location;
        return res.status(200).send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

};

const getLocationFromAddress = async (req, res) =>
{
    let result = {result: `error`};
    const address = req.query.address||'Toronto, Union station';
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const geocodingResponse = await fetch(geocodingUrl);
        let geocodingResult = await geocodingResponse.json();
        // now need to get near by this geocoding
        const location = geocodingResult.results[0].geometry.location;
        result = location;
             return res.status(200).send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

};

const getLocation = async(address) => {
    let result;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const geocodingResponse = await fetch(geocodingUrl);
        let geocodingResult = await geocodingResponse.json();
        // now need to get near by this geocoding
        const location = geocodingResult.results[0].geometry.location;
        result = location;
    } catch (e) {
        console.log(e);
    }
    return result;
}


module.exports = {
    searchNearbyPlaces, getLocationFromAddress, getLocation
};


