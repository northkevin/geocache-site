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
            <br>
            <span class="label">Latitude:</span>
            <input id="latitude" type="text" name="latitude" size="10" />
            <span class="error">* <?php echo $latitude;?></span>
            <br>
            <span class="label">Longitude:</span>
            <input id="longitude" type="text" name="longitude" size="10" />
            <span class="error">* <?php echo $longitude;?></span>
            <br>
            <span class="label">Radius (miles):</span>
            <input id="radius" type="text" name="radius" size="10" />
            <span class="error">* <?php echo $radius;?></span>
            <br>
            <span class="label">Cache Type:</span>
            <input id="cache" type="text" name="cache" size="10" />
            <span class="error">* <?php echo $cache;?></span>
            <br>
            <span class="label">Difficulty:</span>
            <input id="difficulty" type="text" name="difficulty" size="10" />
            <span class="error">* <?php echo $difficulty;?></span>
            <br>
            <input class="button" type="submit" value="Submit" />
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
