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
    <!-- javascript for google maps -->
    <script src="geocache.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB27T0TNsv6oO8sWKaYK9Wmj3al7HVfgCQ&callback=initMap" 
    async defer>
    </script>
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
              <form class="form-control needs-validation" id="geocache-form" method="post" action="query.php" novalidate>
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
                    <input type="text" class="form-control" id="inputLatitude" placeholder="latitude" required>
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
                    <input type="text" class="form-control" id="inputLongitude" placeholder="longitude" required>
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
                    <input type="text" class="form-control" id="inputRaidus" placeholder="radius" required>
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
                    <select class="form-control" id="selectCacheType" placeholder="cache-type">
                      <option>opt 1</option>
                      <option>opt 2</option>
                      <option>opt 3</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-row justify-content-center">
                  <div class="form-group col-md-3 justify-content-left">
                    <label for="selectDifficulty">Difficulty:</label>
                  </div>
                  <div class="form-group col-md-6">
                    <select class="form-control" id="selectDifficulty" placeholder="difficulty">
                      <option>opt 1</option>
                      <option>opt 2</option>
                      <option>opt 3</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-row">
                  <div class="col"></div>
                  <div class="col-md-8 justify-content-center">
                    <button class="btn btn-primary form-control" type="submit">Submit</button>
                  </div>
                  <div class="col"></div>
                </div>

                </fieldset>
              </form>
            </div>

            
            
            <script>
              // Example starter JavaScript for disabling form submissions if there are invalid fields
              (function() {
                'use strict';
                window.addEventListener('load', function() {
                  // Fetch all the forms we want to apply custom Bootstrap validation styles to
                  var forms = document.getElementsByClassName('needs-validation');
                  // Loop over them and prevent submission
                  var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                      if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                      form.classList.add('was-validated');
                    }, false);
                  });
                }, false);
              })();
            </script>
          </div>

          <!-- col 2 -->
          <div class="col-6 has-padding" id="google-maps-api">
          </div>

          <!-- col 3 -->
          <div class="col-3 has-padding" id="flickr-api"> 
            <p> Coming Soon..    Flickr    Coming Soon..</p>

          </div>
        </div>

        <div class="row"><hr></div>
        <!-- row 2 -->
        <div class="row">
          <!-- col 1 -->
          <div class="col" id="geocache-form-results">
            <div class="row" id="geocache-form-results">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Lattitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Cache Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">32.14105481</th>
                    <td>-110.17201093</td>
                    <td>10</td>
                    <td>@multi-cache</td>
                  </tr>
                  <tr>
                    <td scope="row">32.22111910</th>
                    <td>-110.08108222</td>
                    <td>4</td>
                    <td>@mystery-puzzle</td>
                  </tr>
                  <tr>
                    <td scope="row">32.33456564</th>
                    <td>-110.71970180</td>
                    <td>6</td>
                    <td>@traditional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <a href="https://github.com/northkevin/geocache-site"><img src="https://i.imgur.com/Nex6B0O.png"> - Source</img> </a>
    </div>

    
  </body>
</html>
