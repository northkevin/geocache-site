// -------------------------------------------------------------- // 
// -------------------------------------------------------------- // 
// -------------------------------------------------------------- // 
window.onload = function(){
  //var myMapObj = new myMap();
  var map;
  var markers;
  var myLatLng;
  mockFlickr();
}
// -------------------------------------------------------------- // 
// ----------------// MYSQLi //---------------------------------- // 
// -------------------------------------------------------------- // 
function handleSubmit()
{
  var minLat     = map.getBounds().f.b;
  var maxLat     = map.getBounds().f.f;
  var minLong    = map.getBounds().b.b;
  var maxLong    = map.getBounds().b.f;
  var difficulty = document.getElementById('selectDifficulty').value;
  var cacheType  = document.getElementById('selectCacheType').value;
  queryGeocache(minLat,maxLat,minLong,maxLong,difficulty,cacheType);
  return false;
}

function queryGeocache(minLat,maxLat,minLong,maxLong,difficulty,cacheType)
{
  //var url = "http://u.arizona.edu/~klnorth/cscv337/geocache-site/query.php";
  var url = "http://foo.localhost/geocache-site/query.php";
  new Ajax.Request(url,
  {
    method: "post",
    parameters: {minLat: minLat, maxLat: maxLat, minLong: minLong, maxLong: maxLong, difficulty: difficulty, cacheType: cacheType},   
    onSuccess: function(transport){
      var response = transport.responseText || "no response text";
      var json = JSON.parse(response);
      console.log(json);
      drawQueryResults(json);
      drawQueryResultMarkers(json);
    },
    onFailure: function(response) { console.log(response); }
  });
}

function drawQueryResults($json)
{
  var tbody = document.getElementById('geocache-query-results');
  tbody.innerHTML="";
  for (var i = 0; ((i <= $json.length) && (i <= 20)); i++) 
  {
    var row = tbody.insertRow(0);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);
    col1.setAttribute("scope","row");
    col1.innerHTML = $json[i]['latitude'];
    col2.innerHTML = $json[i]['longitude'];
    col3.innerHTML = $json[i]['difficulty_rating'];
    col4.innerHTML = '@' + $json[i]['cache_type'];
  }
}

function drawQueryResultMarkers($json)
{
  deleteMarkers();
  for (var i = 0; ((i <= $json.length) && (i <= 20)); i++) 
  {
    var myLatLng = {lat: parseFloat($json[i]['latitude']), lng: parseFloat($json[i]['longitude'])};
    addMarker(myLatLng);
  }
  showMarkers();
}



// -------------------------------------------------------------- // 
// ----------------// GOOGLE MAPS API //------------------------- // 
// -------------------------------------------------------------- // 

function initMap() 
{
  markers = [];
  myLatLng = {lat: 32.253, lng: -110.912};
  map = new google.maps.Map(document.getElementById('google-maps-api'), {
    center: myLatLng,
    zoom: 8
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  // Info Window - Details
  var infoWindoDiv = document.createElement('div');
  var h3Lat        = document.createElement('h3');
  h3Lat.innerHTML  = location['lat'];
  var h3Lng        = document.createElement('h3');
  h3Lng.innerHTML  = location['lng'];
  infoWindoDiv.appendChild(h3Lat);
  infoWindoDiv.appendChild(h3Lng);
  var infowindow = new google.maps.InfoWindow({
    content: infoWindoDiv
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  // FlickrAPI - Images
  // add onClick event to marker that does the following..
  var flickrDiv  = document.getElementById('flickr-api');
  marker.flickerApi = new FlickrAPI(flickrDiv, location['lat'], location['lng']);
  marker.addListener('click', function() {
      marker.flickerApi.initHtmlDomElements(); // teardown flickr-api div
      requestHtmlDomElementsForFlickrApi(marker.flickerApi);
    });

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


// -------------------------------------------------------------- // 
// ----------------// FLICKR API //------------------------------ //
// -------------------------------------------------------------- // 

function requestHtmlDomElementsForFlickrApi(flickerApi)
{
  console.log(flickerApi.lat + ',' + flickerApi.lng);
  new Ajax.Request("https://api.flickr.com/services/rest/",
  {
    requestHeaders: { "Access-Control-Allow-Headers": "x-prototype-version" },
    method: "get",
    parameters: {api_key: "e0a2ae1f37ac1e47df32f7053517b7cf", method: "flickr.photos.search", lat: flickerApi.lat, lon: flickerApi.lng},   
    onSuccess: function(transport){
      var response = transport.responseXML || "no response text";
      flickerApi.makeFlickrImgUrls(response);
    },
    onFailure: function(response) { console.log('FAILURE'); console.log(response); }
  });
}

function mockFlickr()
{
  var flickerApi = new FlickrAPI(document.getElementById('flickr-api'));
  flickerApi.initHtmlDomElements();
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.addImgUrl("https://i.imgur.com/TmNA8BU.jpg");
  flickerApi.generateDOMElements();
}

function FlickrAPI(div, lat, lng)
{
  this.div          = div;
  this.imgUrls      = [];
  this.displayCount = 12;
  this.lat          = lat;
  this.lng          = lng;
}

FlickrAPI.prototype.initHtmlDomElements = function() 
{
  this.div.innerHTML = "";
}

// DOM inheritance looks like --> 'div#flickr-api' --> 'div.row' --> 'div.col' --> 'img.img-fluid'
FlickrAPI.prototype.generateDOMElements = function()
{
  var row;
  var col;
  var img;
  alert('entering generateDOMElements');
  if(this.imgUrls.length < 1)
  {
    row = makeDivRow();
  
    col = makeDivCol();
    var h3        = document.createElement('h3');
    h3.innerHTML  = "Could not uncover any pictures for this geocache";
    h3.setAttribute("class","no-geocache-message");
    col.appendChild(h3);
    row.appendChild(col);

    col = makeDivCol();
    img = makeFlickrImg("https://i.imgur.com/TmNA8BU.jpg");
    col.appendChild(img);
    row.appendChild(col);

    this.div.appendChild(row);
  }
  else
  {
    console.log("imgUrls.length=" + this.imgUrls.length);
    console.log("imgUrls=" + this.imgUrls);
    
    for (var i = 0; ((i < this.imgUrls.length) && (i < this.displayCount)); i++) 
    {
      if( ( i % 2 ) == 0 ) // I want 2 columns of pictures
      {
        row = makeDivRow();
      }
      col = makeDivCol();
      img = makeFlickrImg(this.imgUrls[i]);
      img.setAttribute('id',i);
      col.appendChild(img);
      row.appendChild(col);

      if( ( i % 2 ) == 0 ) // I want 2 columns of pictures
      {
        this.div.appendChild(row);
      }
    }
  }
}

FlickrAPI.prototype.addImgUrl = function(url)
{
  this.imgUrls.push(url);
}

FlickrAPI.prototype.makeFlickrImgUrls = function(xmlDocResponse)
{
  if(xmlDocResponse instanceof XMLDocument)
  {
    var photos = xmlDocResponse.getElementsByTagName('photo');
    for (var i = 0; ((i < photos.length) && (i < 12)); i++) 
    {
      var url = "";
      var farm_id = photos[i].getAttribute("farm");
      var server_id = photos[i].getAttribute("server");
      var id = photos[i].getAttribute("id");
      var secret = photos[i].getAttribute("secret");

      url = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_t.jpg`
      // imgUrls.push(url);
      this.addImgUrl(url);
    }
  }
  this.generateDOMElements(); // reDraw the dom for imgUrls
  // return imgUrls;
}

function makeDivRow()
{
  var divRow = document.createElement("div");
  divRow.className = "row"
  return divRow;
}

function makeDivCol()
{
  var divCol = document.createElement("div");
  divCol.className = "col-sm-6";
  return divCol;
}

function makeFlickrImg(url)
{
  var img = document.createElement("img");
  img.className = "img-fluid";
  img.src       = url;
  return img;
}

