// -------------------------------------------------------------- // 
// -----------------// DOM //------------------------------------ // 
// -------------------------------------------------------------- // 
window.onload = function()
{
  var map;
  var markers;
  var myLatLng;
  mockFlickr();
  ; //milliseconds
}

function handleSubmit()
{
  var form           = document.getElementById('geocache-form');
  var inputLatitude  = document.getElementById('inputLatitude');
  var inputLongitude = document.getElementById('inputLongitude');
  var inputRadius    = document.getElementById('inputRadius');
  if( !inputLatitude.checkValidity() || !inputLongitude.checkValidity() || !inputRadius.checkValidity() )
  {
    // lol I've been doing this for too long, just hackin' away..
    // originally, I did validation using 'submit' on my form button.. then I refactored to use 'onclick' javascript eventListener
    // .. so now you get this fake button to force my original validation code lol.
    var fakeSubmitButton = document.createElement('input');
    fakeSubmitButton.setAttribute('type','submit');
    fakeSubmitButton.style.visibility = "hidden";
    form.appendChild(fakeSubmitButton);
    fakeSubmitButton.click();
  }
  else
  {
    var newCenter    = {lat: parseFloat(inputLatitude.value), lng: parseFloat(inputLongitude.value)};
    var newMapBounds = calculateBoundsFromCenter(parseFloat(inputLatitude.value),parseFloat(inputLongitude.value));
    var difficulty   = document.getElementById('selectDifficulty').value;
    var cacheType    = document.getElementById('selectCacheType').value;
    setMapToCenter(newCenter);
    queryGeocache(newMapBounds['minLat'],newMapBounds['maxLat'],newMapBounds['minLong'],newMapBounds['maxLong'],difficulty,cacheType);
  }
  return false;
}
function calculateBoundsFromCenter(inputLatitude,inputLongitude)
{
  var offsetLat  = 1.21015;
  var offsetLng  = 1.67916;
  var minLat     = inputLatitude  - offsetLat;
  var maxLat     = inputLatitude  + offsetLat;
  var minLong    = inputLongitude - offsetLng;
  var maxLong    = inputLongitude + offsetLng;
  return {minLat: minLat, maxLat: maxLat, minLong: minLong, maxLong: maxLong};
}
function setMapToCenter(newCenter)
{
  map.setCenter(newCenter);
}
  
// -------------------------------------------------------------- // 
// ----------------// PHP //------------------------------------- // 
// -------------------------------------------------------------- // 

function queryGeocache(minLat,maxLat,minLong,maxLong,difficulty,cacheType)
{
  var url = "http://u.arizona.edu/~klnorth/cscv337/geocache-site/query.php";
  new Ajax.Request(url,
  {
    method: "post",
    parameters: {minLat: minLat, maxLat: maxLat, minLong: minLong, maxLong: maxLong, difficulty: difficulty, cacheType: cacheType},   
    onSuccess: function(transport){
      var response = transport.responseText || "no response text";
      var json = JSON.parse(response);
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
  for (var i = 0; i < $json.length; i++) 
  {
    var row        = tbody.insertRow(0);
    var col1       = row.insertCell(0);
    var col2       = row.insertCell(1);
    var col3       = row.insertCell(2);
    var col4       = row.insertCell(3);
    col1.innerHTML = $json[i]['latitude'];
    col2.innerHTML = $json[i]['longitude'];
    col3.innerHTML = $json[i]['difficulty_rating'];
    col4.innerHTML = '@' + $json[i]['cache_type'];
    col1.setAttribute("scope","row");
  }
}

function drawQueryResultMarkers($json)
{
  deleteMarkers();
  for (var i = 0; i < $json.length; i++) 
  {
    var difficulty = $json[i]['difficulty_rating'];
    var cache_type = $json[i]['cache_type'];
    var myLatLng = {lat: parseFloat($json[i]['latitude']), lng: parseFloat($json[i]['longitude'])};
    addMarker(myLatLng,cache_type,difficulty);
  }
  showMarkers();
}

// -------------------------------------------------------------- // 
// ----------------// GOOGLE MAPS API //------------------------- // 
// -------------------------------------------------------------- // 

function initMap() 
{
  markers  = [];
  myLatLng = {lat: 32.253, lng: -110.912};
  map      = new google.maps.Map(document.getElementById('google-maps-api'), {
    center: myLatLng,
    zoom: 8
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location,cache_type,difficulty) 
{
  var markerTimeout = 10000;
  
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: cache_type + ": " + difficulty
  });

  // Info Window - Details
  var data         = {lat: location['lat'], lng: location['lng'], cache_type: cache_type, difficulty: difficulty};
  var infoWindoDiv = makeInfoWindowHTML(data);
  var infowindow   = new google.maps.InfoWindow({
    content: infoWindoDiv
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
    window.setTimeout(function() {
      infowindow.close(map,marker);
    }, markerTimeout);
  });

  // FlickrAPI - Images
  // add onClick event to marker that does the following..
  var flickrDiv     = document.getElementById('flickr-api');
  marker.flickerApi = new FlickrAPI(flickrDiv, location['lat'], location['lng']);
  marker.addListener('click', function() {
      marker.flickerApi.initHtmlDomElements(); // teardown flickr-api div
      requestHtmlDomElementsForFlickrApi(marker.flickerApi);
    });

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) 
{
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() 
{
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() 
{
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() 
{
  clearMarkers();
  markers = [];
}

function makeInfoWindowHTML(data)
{ 
  var div                 = document.createElement('div');
  var h3Lat               = document.createElement('h3');
  h3Lat.innerHTML         = data['lat'];
  var h3Lng               = document.createElement('h3');
  h3Lng.innerHTML         = data['lng'];
  var h4Cache_type        = document.createElement('h4');
  h4Cache_type.innerHTML  = data['cache_type'];
  var h4Difficulty        = document.createElement('h4');
  h4Difficulty.innerHTML  = data['difficulty'];
  div.appendChild(h3Lat);
  div.appendChild(h3Lng);
  div.appendChild(h4Cache_type);
  div.appendChild(h4Difficulty);
  return div;
}

// -------------------------------------------------------------- // 
// ----------------// FLICKR API //------------------------------ //
// -------------------------------------------------------------- // 

function OLDrequestHtmlDomElementsForFlickrApi(flickerApi)
{
  new Ajax.Request("https://api.flickr.com/services/rest/",
  {
    method: "get",
    parameters: {api_key: "e0a2ae1f37ac1e47df32f7053517b7cf", method: "flickr.photos.search", lat: flickerApi.lat, lon: flickerApi.lng},   
    onSuccess: function(transport){
      var response = transport.responseXML || "no response text";
      flickerApi.makeFlickrImgUrls(response);
    },
    onFailure: function(response) { console.log('FAILURE'); console.log(response); }
  });
}

function requestHtmlDomElementsForFlickrApi(flickerApi)
{
  var xmlhttp = new XMLHttpRequest();
  var api_key = "e0a2ae1f37ac1e47df32f7053517b7cf"; // TODO change this to load local resource
  var method  = "flickr.photos.search";
  var lat     = flickerApi.lat;
  var lon     = flickerApi.lng;
  var baseUrl = "https://api.flickr.com/services/rest/";
  var url     = baseUrl + '?' + 'api_key=' + api_key + '&method=' + method + '&lat=' + lat + '&lon=' + lon;
  
  xmlhttp.open("GET", url, true);
  xmlhttp.responseType = 'document';
  xmlhttp.overrideMimeType('text/xml');
  xmlhttp.onreadystatechange = function() 
  {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      var rsp = xmlhttp.responseXML;
      flickerApi.makeFlickrImgUrls(rsp);
    }
  };
  xmlhttp.send();
}

function mockFlickr()
{
  var flickerApi = new FlickrAPI(document.getElementById('flickr-api'));
  flickerApi.initHtmlDomElements();
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.addImgUrl(flickerApi.DEFAULT_IMG);
  flickerApi.generateDOMElements();
}

function FlickrAPI(div, lat, lng)
{
  this.div          = div;
  this.imgUrls      = [];
  this.displayCount = 12;
  this.lat          = lat;
  this.lng          = lng;
  this.DEFAULT_IMG  = "https://i.imgur.com/TmNA8BU.jpg";
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
  if(this.imgUrls.length < 1)
  {
    //
    // Display to user that no flickr images exist for this geocache location
    //

    row           = makeDivRow();
    col           = makeDivCol();
    var h3        = document.createElement('h3');
    h3.innerHTML  = "Could not uncover any pictures for this geocache";
    h3.setAttribute("class","no-geocache-message");
    col.appendChild(h3);
    row.appendChild(col);

    col           = makeDivCol();
    img           = makeFlickrImg(this.DEFAULT_IMG);
    col.appendChild(img);
    row.appendChild(col);

    this.div.appendChild(row);
  }
  else
  { 
    //
    // Display the flickr images to user
    //
    
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
    for (var i = 0; ((i < photos.length) && (i < this.displayCount)); i++) 
    {
      var url       = "";
      var farm_id   = photos[i].getAttribute("farm");
      var server_id = photos[i].getAttribute("server");
      var id        = photos[i].getAttribute("id");
      var secret    = photos[i].getAttribute("secret");

      url = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_t.jpg`
      this.addImgUrl(url);
    }
  }
  this.generateDOMElements(); // reDraw the dom for imgUrls
}

function makeDivRow()
{
  var divRow       = document.createElement("div");
  divRow.className = "row"
  return divRow;
}

function makeDivCol()
{
  var divCol       = document.createElement("div");
  divCol.className = "col-sm-6";
  return divCol;
}

function makeFlickrImg(url)
{
  var img       = document.createElement("img");
  img.className = "img-fluid";
  img.src       = url;
  return img;
}