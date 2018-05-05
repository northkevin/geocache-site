<?php

require 'lib.php';
  
function query_geocache_results($difficulty, $cacheType)
{
  $sql = "SELECT latitude, longitude, difficulty_rating, cache_types.cache_type \n"

    . "FROM `test_data`\n"

    . "INNER JOIN cache_types ON cache_types.type_id = cache_type_id\n"

    . "WHERE difficulty_rating = $difficulty\n"

    . "AND cache_types.cache_type = \"$cacheType\"";

  $results = unsecure_query($sql);
  return $results;
}

function query_geocache_results_final($minLat, $maxLat, $minLong, $maxLong, $difficulty, $cacheType)
{
  $sql = "SELECT latitude, longitude, difficulty_rating, cache_types.cache_type\n"

    . "FROM `test_data`\n"

    . "INNER JOIN cache_types ON cache_types.type_id = cache_type_id\n"

    . "WHERE (latitude BETWEEN ROUND($minLat, 7) AND ROUND($maxLat, 7))\n"

    . "AND (longitude BETWEEN ROUND($minLong, 6) AND ROUND($maxLong, 6))\n"

    . "AND (difficulty_rating = $difficulty)\n"

    . "AND (cache_types.cache_type = \"$cacheType\")";

  $results = unsecure_query($sql);
  return $results;
}

if ($_SERVER["REQUEST_METHOD"] == "POST")
{

  // var_dump($_POST);

  if(isset($_POST['minLat']))
  {
    $minLat = $_POST['minLat'];
  }
  if(isset($_POST['maxLat']))
  {
    $maxLat = $_POST['maxLat'];
  }
  if(isset($_POST['minLong']))
  {
    $minLong = $_POST['minLong'];
  }
  if(isset($_POST['maxLong']))
  {
    $maxLong = $_POST['maxLong'];
  }
  if(isset($_POST['difficulty']))
  {
    $difficulty = $_POST['difficulty'];
  }
  if(isset($_POST['cacheType']))
  {
    $cacheType = $_POST['cacheType'];
  }

  // todo, add validation for params..
  // $geocacheData = query_geocache_results($difficulty, $cacheType);
  $geocacheData = query_geocache_results_final($minLat, $maxLat, $minLong, $maxLong, $difficulty, $cacheType);
  echo json_encode($geocacheData);
  
}

?>