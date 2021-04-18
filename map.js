function findCenter(d) {
    // find min and max of latitude & longitude
    var minLat = d[0][0]
    var maxLat = d[0][0]
    var minLong = d[0][1]
    var maxLong = d[0][1]

    for (var i = 0; i < d.length; i++) {
        if (d[i][0] < minLat) { minLat = d[i][0] }
        if (d[i][1] < minLong) { minLong = d[i][1] }
        if (d[i][0] > maxLat) { maxLat = d[i][0] }
        if (d[i][1] > maxLong) { maxLong = d[i][1] }
       }

    var centerLat = (minLat+maxLat)/2
    var centerLong = (minLong+maxLong)/2

    return [parseFloat(centerLat), parseFloat(centerLong)]
}

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText)
      var center = findCenter(myArr);
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obnZrIiwiYSI6ImNrbXNkbTg0bjBncjIyb280OGk4ZXB0M3YifQ.y0liD0eOsXDQBoyHjeB4Gw';
      var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 6,
            center: [center[1], center[0]] // [-74.5, 40]
            });
      var i;
      for (i = 0; i < myArr.length; i++) {
          var marker1 = new mapboxgl.Marker()
           .setLngLat([parseFloat(myArr[i][1]), parseFloat(myArr[i][0])])
           .addTo(map);
      }
    }
  };
  xhttp.open("GET", "/suny_map", true);
  xhttp.send();
}
