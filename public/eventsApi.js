function searchBtnClick(ev)
{
    ev.preventDefault();
    let city = $("#city").val().trim() || 'Toronto';
    $.get("/events?city=" + city +',Ontario, Canada', function (data, status) {
            showEventsOnGrid(data);
    });
}
let eventsMap;

function showEventsOnGrid(data)
{
    let events = data["events_results"];
    let searchLocation = data["search_location"];
    let i = 1;
       eventsMap = new google.maps.Map(document.getElementById('searchMap'), {
        center: searchLocation,
        zoom: 10
    });
    const marker = new google.maps.Marker({
        position: searchLocation,
        map: eventsMap,
        animation: google.maps.Animation.DROP,
        id: 'YouAreHere'
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
    
    events.forEach(event => {
        let address = event["address"];
        let title = event["title"];
        let thumbnail = event["thumbnail"];
        let description = event["description"];
        let date = event["date"]["start_date"];
        let time = event["date"]["when"];
                    let eventId=`#event${i}`;

        if (i < 5) {
            let eventTag = `<img class="service-image" src="${thumbnail}" alt="Service image" width="100px" height="100px">
                    <div class="map-item-details">
                        <h3>${title}</h3>
                        <p class="map-item-description">${description}</p>
                        <div class="guides-categories">
                            <p class="location">Date: ${date}, When : ${time}</p>
                            <p class="location">${address}</p>
                        </div>
                    </div>`;
            $(eventId).html(eventTag);

        }
        else if (i>4 && i<8)
        {
            let eventTag = ` <div class="services-icon">
                    <img src="${thumbnail}" alt="Icon">
                </div>
                <h3>${title}</h3>
                <p class="service-description">Date: ${date}, When : ${time}</p>
                <h5 class="number-of-services">Location: ${address}</h5>`;
                        $(eventId).html(eventTag);

        }
        
        
      const marker = new google.maps.Marker({
            position: event["location"],
            map: eventsMap,
            animation: google.maps.Animation.DROP,
            id: `Map${eventId}`
        });
        let contentString = `<div class="map-item">
                    <img class="service-image" src="assets/image.jpg" alt="Service image" width="30px" height="30px">
                    <div class="map-item-details">
                        <h3>${title}</h3>
                        <h4>Address: ${address}</h4>
                    </div>
                </div>`;
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map: eventsMap
            });
        });
         i++;
    });
}


function showMapOnSearch(data)
{
    let events = data["events_results"];
    

    

}
function createMap()
{
    $.get("/location?address=UnionStation,toronto,canada", function (data, status) {
        
        //{"lat":43.8970929,"lng":-78.86579119999999}
        let lat = data["lat"];
        let lng = data["lng"];
        eventsMap = new google.maps.Map(document.getElementById('searchMap'), {
            center: data,
            zoom: 13
        });
        /* const marker = new google.maps.Marker({
         position: location,
         map: servicesMap,
         animation: google.maps.Animation.DROP,
         id: placeId
         });*/
    });
}
