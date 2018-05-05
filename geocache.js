// -------------------------------------------------------------- // 
// -------------------------------------------------------------- // 
// -------------------------------------------------------------- // 
window.onload = function(){
  //var myMapObj = new myMap();
  var map;
  var markers;
  var myLatLng;
  var xmlDocFlickrInitThumbNails = [];
  mockFlickr();
}
// -------------------------------------------------------------- // 
// -------------------------------------------------------------- // 
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

function getImgUrlsFromFlickr(xmlDocResponse)
{
  imgUrls = [];
  var photos = xmlDocResponse.getElementsByTagName('photo');
  for (var i = 0; ((i <= photos.length) && (i <= 12)); i++) 
  {
    var url = "";
    var farm_id = photos[i].getAttribute("farm");
    var server_id = photos[i].getAttribute("server");
    var id = photos[i].getAttribute("id");
    var secret = photos[i].getAttribute("secret");

    url = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_t.jpg`
    imgUrls.push(url);
  }
  return imgUrls;
}

function queryFlickrRestApi(markerId,lat,lon)
{
  new Ajax.Request("https://api.flickr.com/services/rest/",
  // new Ajax.Request("http://foo.localhost",
  {
    requestHeaders: { "Access-Control-Allow-Headers": "x-prototype-version" },
    method: "get",
    parameters: {api_key: "e0a2ae1f37ac1e47df32f7053517b7cf", method: "flickr.photos.search", lat: lat, lon: lon},   
    onSuccess: function(transport){
      var response = transport.responseXML || "no response text";
      var imgUrls = getImgUrlsFromFlickr(response);
      
      // LOL
      console.log(imgUrls);
      console.log(markerId);
      addFlickerImgs(markerId,imgUrls);
    },
    onFailure: function(response) { console.log('FAILURE'); console.log(response); }
  });
}

function addFlickerImgs(markerId,imgUrls)
{
  var div = document.getElementById(markerId);
  var flickrApi;
  flickrApi = new FlickrAPI(div);
  var mockflickrApi = new FlickrAPI(document.getElementById('flickr-api'));
  for (var i = 0; ((i < imgUrls.length) && (i <= 6)); i++) 
  {
    console.log("adding flicker imgs");
    flickrApi.addRowForReal(imgUrls[i]);
    mockflickrApi.addRowForReal(imgUrls[i]);
  }
}

function queryGeocache(minLat,maxLat,minLong,maxLong,difficulty,cacheType)
{
  new Ajax.Request("http://u.arizona.edu/~klnorth/cscv337/geocache-site/query.php",
  // new Ajax.Request("http://foo.localhost",
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

  id = `marker-${location['lat']}${location['lng']}`;
  queryFlickrRestApi(id, location['lat'], location['lng']);

  var div = document.createElement('div');
  div.setAttribute("id",id);
  div.setAttribute("class","container-fluid");
  // genFlickrContentHTML(div);

  var infowindow = new google.maps.InfoWindow({
    content: div
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
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

function mockFlickr()
{
  var flickrApi;
  flickrApi = new FlickrAPI(document.getElementById('flickr-api'));
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
}

function genFlickrContentHTML(div)
{
  var flickrApi;
  flickrApi = new FlickrAPI(div);
  for (var i = 0; ((i <= 6)); i++) 
  {
    flickrApi.addRow();
  }
}

function FlickrAPI(div) 
{
  this.div = div;
  // this.div.setAttribute('class','container-fluid');
}
FlickrAPI.prototype.addRow = function() 
{
  var row = makeDivRow();
  row = appendMockFlickrPicturesTo(row);
  this.div.appendChild(row);
}
FlickrAPI.prototype.addRowForReal = function(url1) 
{
  var row = makeDivRow();
  row = appendFlickrPicturesTo(row,url1);
  this.div.appendChild(row);
}

function appendFlickrPicturesTo(divRow,url1)
{
  // var url1    = url1;
  var url2    = "https://i.imgur.com/TmNA8BU.jpg";
  // var url3    = "https://i.imgur.com/TmNA8BU.jpg";

  var divCol1 = makeDivCol();
  var divCol2 = makeDivCol();
  // var divCol3 = makeDivCol();
  
  var img1    = makeFlickrImg(url1);
  var img2    = makeFlickrImg(url2);
  // var img3    = makeFlickrImg(url3);

  divCol1.appendChild(img1);
  divCol2.appendChild(img2);
  // divCol3.appendChild(img3);

  divRow.appendChild(divCol1);
  divRow.appendChild(divCol2);
  // divRow.appendChild(divCol3);

  return divRow;
}

// pass var, return value is the param.
function appendMockFlickrPicturesTo(divRow)
{
  var url1    = "https://i.imgur.com/TmNA8BU.jpg";
  var url2    = "https://i.imgur.com/TmNA8BU.jpg";
  // var url3    = "https://i.imgur.com/TmNA8BU.jpg";

  var divCol1 = makeDivCol();
  var divCol2 = makeDivCol();
  // var divCol3 = makeDivCol();
  
  var img1    = makeFlickrImg(url1);
  var img2    = makeFlickrImg(url2);
  // var img3    = makeFlickrImg(url3);

  divCol1.appendChild(img1);
  divCol2.appendChild(img2);
  // divCol3.appendChild(img3);

  divRow.appendChild(divCol1);
  divRow.appendChild(divCol2);
  // divRow.appendChild(divCol3);

  return divRow;
}

