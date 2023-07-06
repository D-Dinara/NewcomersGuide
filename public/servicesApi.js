function searchBtnClick(ev)
{
    ev.preventDefault();
    let postalCode = $("#postalCode").val().trim() || 'L1E1Z1';
    let placeType =  $("#placeTypeInput").val().trim();
    $.get("/services?postalCode=" + postalCode + "&serviceType="+placeType, function (data, status) {
        showMapOnSearch(data);
    });
}

let servicesMap;
function createMap()
{
    $.get("/services?postalCode=M5J&serviceType=UnionStation", function (data, status) {
        let places = data["results"];
        let location = places[0]["geometry"]["location"];
        let placeId = places[0]["place_id"];
        servicesMap = new google.maps.Map(document.getElementById('searchMap'), {
            center: location,
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

function showMapOnSearch(data)
{
    let searchLocation = data["search_location"];
    let places = data["results"];
    servicesMap = new google.maps.Map(document.getElementById('searchMap'), {
        center: searchLocation,
        zoom: 10
    });
    const marker = new google.maps.Marker({
        position: searchLocation,
        map: servicesMap,
        animation: google.maps.Animation.DROP,
        id: 'YouAreHere'
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
    places.forEach(place => {
        let location = place["geometry"]["location"];
        let placeId = place["place_id"];


        const marker = new google.maps.Marker({
            position: location,
            map: servicesMap,
            animation: google.maps.Animation.DROP,
            id: placeId
        });
        let contentString = `<div class="map-item">
                    <img class="service-image" src="assets/image.jpg" alt="Service image" width="30px" height="30px">
                    <div class="map-item-details">
                        <h3>${place['name']}</h3>
                        <h4>Address: ${place['vicinity']}</h4>
                        <p class="map-item-description">Phone: 987-654-3210</p>
                        <p class="location">Categories: ${place['types']}</p>
                        <div class="contacts">
                            <div class="title-container">
                                <div class="organization-logo"></div>
                                <p class="organization-title">Website: www.website.com</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map: servicesMap
            });
        });
    });
}

$(window).on('load', createMap());