window.onload = function(){
  mockFlickr();
}

function BoundingBox()
{
  this.x = 50;
  this.y = 100;
}

function testBoundingBox(aBox)
{
  var test = new BoundingBox();
  alert(test.x);
  alert(test.y);
}


function initMap() 
{
  var map;
  map = new google.maps.Map(document.getElementById('google-maps-api'), {
    center: {lat: 32.253, lng: -110.912},
    zoom: 8
  });
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
  divCol.className = "col";
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
  flickrApi = new mockFlickrAPI(document.getElementById('flickr-api'));
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
  flickrApi.addRow();
}

function mockFlickrAPI(div) 
{
  this.div = div;
}
mockFlickrAPI.prototype.addRow = function() 
{
  var row = makeDivRow();
  row = appendMockFlickrPicturesTo(row);
  this.div.appendChild(row);
}

// pass var, return value is the param.
function appendMockFlickrPicturesTo(divRow)
{
  var url1    = "https://i.imgur.com/0UR3CHW.png";
  var url2    = "https://i.imgur.com/k5LwUhT.png";
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

