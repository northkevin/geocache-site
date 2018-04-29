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