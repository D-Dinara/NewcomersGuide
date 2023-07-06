const fetch = require('node-fetch');
const services = require("./services");

const apiKey = `dbc7ee4f040b5916f50920ade7d968102d15cef622b2f609157951f71696b38a`;
const searchNearbyEvents = async (req, res) =>
{
    let result = {result: `error`};
    const city = req.query.city||'Toronto';
    const eventsUrl = `https://serpapi.com/search.json?engine=google_events&q=Events+in+${encodeURIComponent(city)}&hl=en&gl=us&api_key=${apiKey}`;
    //const eventsUrl = `http://localhost:3000/sampleEvent.json.js`;
        console.log(eventsUrl);
    try {
        const eventResponse = await fetch(eventsUrl);
        let eventResult = await eventResponse.json();
        // now need to get near by this geocoding
        for (const event of eventResult["events_results"]) {
            event.location =  await services.getLocation(event["address"]);
        };
        result = eventResult;
        
        result.search_location = await services.getLocation(city);
        return res.status(200).send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

};

module.exports = {
    searchNearbyEvents
};
