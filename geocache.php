<!DOCTYPE html>
<html>
<!--
    This assignment is based on one from the Web Programming Step by Step textbook by Marty Stepp.
-->
  <head>
    <title>Geocache Site</title>

    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="en-us" />

    <link rel="shortcut icon" href="https://i.imgur.com/PpBHRUq.png" type="image/png" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="geocache.css" type="text/css" />

    <script src="http://u.arizona.edu/~lxu/cscv337/sp18/hw6/js/prototype.js" type="text/javascript"></script>
    <script src="http://u.arizona.edu/~lxu/cscv337/sp18/hw6/js/scriptaculous.js" type="text/javascript"></script>
  </head>

  <body>

    <div class="banner">
      <a href="geocache.php"><h2>Geocache Site</h2></a>
      <p>
        <img src="https://i.imgur.com/TmNA8BU.jpg" alt="Geocache-Cactus" />
      </p>
    </div>  

    <div id="main">
      <!-- a place to inject the results from actors.php -->

      <div id="geocache-form-inputs"> 
        <form id="geocache-form" method="post" action="query.php">
          <fieldset>
            <legend> Geocache Locator </legend>
            <p> Click on the map to select a location, or enter one manually below. </p>

            <div class="form-group row">
              <label for="inputLatitude" class="col-sm-2 col-form-label">Latitude:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputLatitude" placeholder="latitude">
              </div>
            </div>

            <div class="form-group row">
              <label for="inputLongitude" class="col-sm-2 col-form-label">Longitude:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputLongitude" placeholder="longitude">
              </div>
            </div>

            <div class="form-group row">
              <label for="inputRadius" class="col-sm-2 col-form-label">Radius (miles):</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputRaidus" placeholder="radius">
              </div>
            </div>

            <div class="form-group row">
              <label for="selectCacheType" class="col-sm-2 col-form-label">Cache Type:</label>
              <div class="col-sm-10">
                <select class="form-control" id="selectCacheType" placeholder="cache-type">
                  <option>opt 1</option>
                  <option>opt 2</option>
                  <option>opt 3</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label for="selectDifficulty" class="col-sm-2 col-form-label">Difficulty:</label>
              <div class="col-sm-10">
                <select class="form-control" id="selectDifficulty" placeholder="difficulty">
                  <option>opt 1</option>
                  <option>opt 2</option>
                  <option>opt 3</option>
                </select>
              </div>
            </div>

            <button class="btn btn-primary" type="submit">Submit</button>
          </fieldset>
        </form>
      </div>

      <div id="geocache-form-results"> 

      </div>

      <div id="google-maps-api"> </div>

      <div id="flickr-api"> </div>

      
    </div>

    <div class="footer">
      <p>
        CSCV 337 - Kevin North - 4/28/2018
      </p>
    </div>

    
  </body>
</html>
