<?php
require "lib.php";
$displayGeocacheSelection = new GeocacheSelection(32.253, -110.912, 5, 'Traditional', 7);
$GOOGLEMAPKEY = get_google_api_key();
?>

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
    <!-- css bootstrap -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- jasny extension to boostrap -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
    <!-- javascript for google maps -->
    <script src="geocache.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=<?=$GOOGLEMAPKEY?>&callback=initMap" async defer> </script>
    <!-- ... uhh trying this jquery stuff -->
  </head>

  <body>

    
    <div class="banner"> </div>  

    <div class="title">
      <a href="geocache.php">Geocache Site</a>
    </div>

    <div id="main">

      <div class="container-fluid">

        <!-- row 1 -->
        <div class="row">
          <!-- col 1 -->
          <div class="col-3 has-padding">
            <div class="row" id="geocache-form-inputs">
              <div class="col-md">
                <form class="form-control" id="geocache-form" onSubmit="handleSubmit()">
                  <fieldset>

                  <div class="form-row justify-content-center">
                    <div class="form-group">
                      <label class="title" for="form-instructions">Geocache Locator</label>
                      <small id="form-instructions" class="form-text">Click on the map to select a location, or enter one manually below.</small>
                    </div>
                  </div>
                  
                  <div class="form-row justify-content-center">
                    <div class="form-group col-md-3 justify-content-right">
                      <label for="inputLatitude">Latitude:</label>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="number" min="31" max="37" step="0.00000001" class="form-control" id="inputLatitude" name="latitude" placeholder="<?=$displayGeocacheSelection->getLatitude()?>" required>
                    </div>
                    <div class="form-group col-md-3 invalid-feedback">
                      Please provide a valid Latitude.
                    </div>
                  </div>

                  <div class="form-row justify-content-center">
                    <div class="form-group col-md-3 justify-content-left">
                      <label for="inputLongitude">Longitude:</label>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="number" min="-115" max="-109" step="0.0000001"  class="form-control" id="inputLongitude" name="longitude" placeholder="<?=$displayGeocacheSelection->getLongitude()?>" required>
                    </div>
                    <div class="form-group col-md-3 invalid-feedback">
                      Please provide a valid Longitude.
                    </div>
                  </div>

                  <div class="form-row justify-content-center">
                    <div class="form-group col-md-3 justify-content-left">
                      <label for="inputRadius">Radius (miles):</label>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="number" step="5" min="5" max="250" class="form-control" id="inputRadius" name="radius" placeholder="<?=$displayGeocacheSelection->getRadius()?>" required>
                    </div>
                    <div class="form-group col-md-3 invalid-feedback">
                      Please provide a valid Radius.
                    </div>
                  </div>

                  <div class="form-row form-group zero-margin-bottom justify-content-center">
                    <div class="form-group col-md-3 justify-content-left">
                      <label for="selectCacheType">Cache Type:</label>
                    </div>
                    <div class="form-group col-md-6">
                      <select class="form-control" id="selectCacheType" name="cacheType">
                        <option value="Traditional">Traditional</option>
                        <option value="Mystery/Puzzle">Mystery/Puzzle</option>
                        <option value="Multi-Cache">Multi-Cache</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group form-row justify-content-center">
                    <div class="form-group col-md-3 justify-content-left">
                      <label for="selectDifficulty">Difficulty:</label>
                    </div>
                    <div class="form-group col-md-6">
                      <select class="form-control" id="selectDifficulty" name="difficulty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group form-row">
                    <div class="col"></div>
                    <div class="col-md-8 justify-content-center">
                      <button class="btn btn-primary form-control" type="button" onclick="handleSubmit();">Submit</button>
                    </div>
                    <div class="col"></div>
                  </div>

                  </fieldset>
                </form>
              </div>
            </div>

          </div>

          <!-- col 2 -->
          <div class="col-6 has-padding" id="google-maps-api">
          </div>

          <!-- col 3 -->
          <div class="col-3 has-padding" id="flickr-api"> 
            <p> Coming Soon..    Flickr    Coming Soon..</p>

          </div>
        </div>

        <!-- row 2 -->
        <div class="row"><hr></div>

        <!-- row 3 -->
        <div class="row">
          <!-- row 3, col 1 -->
          <div class="col" id="geocache-form-results">
            
              <table class="table table-hover rowlink" data-link="row">
                <thead>
                  <tr>
                    <th scope="col">Lattitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Cache Type</th>
                  </tr>
                </thead>
                <tbody id="geocache-query-results">
                  
                </tbody>
              </table>
            
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <a href="https://github.com/northkevin/geocache-site"><img src="https://i.imgur.com/Nex6B0O.png"> - Source</img> </a>
    </div>

    
  </body>
</html>
