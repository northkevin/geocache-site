<?php

// 
// General
//

class GeocacheSelection
{
  private $latitude;
  private $longitude;
  private $radius;
  private $cacheType;
  private $difficulty;

  public function __construct($latitude, $longitude, $radius, $cacheType, $difficulty)
  {
    $this->latitude = $latitude;
    $this->longitude = $longitude;
    $this->radius = $radius;
    $this->cacheType = $cacheType;
    $this->difficulty = $difficulty;
  }

  public function getLatitude()   {return $this->latitude;}
  public function getLongitude()  {return $this->longitude;}
  public function getRadius()     {return $this->radius;}
  public function getCacheType()  {return $this->cacheType;}
  public function getDifficulty() {return $this->difficulty;}

  public function test()
  {
    echo $this->getLatitude();
    echo $this->getLongitude();
    echo $this->getRadius();
    echo $this->getCacheType();
    echo $this->getDifficulty();
  }
}

// https://stackoverflow.com/questions/4323411/how-can-i-write-to-console-in-php
function debug_to_console( $data ) 
{
  $output = $data;
  if ( is_array( $output ) )
      $output = implode( ',', $output);

  // echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
    echo "<script>console.log( 'Debug Objects: " . var_dump($data) . "' );</script>";
}

//
// Google Maps
//

function get_google_api_key() 
{
  return read_key('google_api_key');
}

function read_key($filename)
{
  $target_filename      = join(DIRECTORY_SEPARATOR,[__DIR__, $filename]);
  $local_file           = fopen($target_filename, "r");   // open file
  $key                  = fgets($local_file);             // populate $info_data array
  fclose($local_file);
  return $key;
}

//
// SQL 
//
function unsecure_query($sql)
{
  $hostname = getenv('HOSTNAME');
  $dbname = getenv('DB_NAME');
  $port = getenv('DB_PORT');
  $username = getenv('DB_USERNAME');
  $password = getenv('DB_PASSWORD');
  $results = [];

  try
  {
    $connection = new mysqli($hostname, $username, $password, $dbname, $port);
  }
  catch(exception $e)
  {
    // echo "Failed to connect to MySQL: (" . $e->getMessage();
    debug_to_console("error during init" . $e->getMessage);
  }
      
  if ($connection->connect_error)
  {
    debug_to_console("error in connection" . $connection->connect_error);
  }
      
  if (!$result= $connection->query($sql)) 
  {
    debug_to_console("error in result: " . var_dump($result));
  }
  else
  {
    while($row = $result ->fetch_assoc())
    {
      $rows[]=$row;
    }
    if(isset($rows))
    {
      $results = $rows;
    }
    else
    {
      $results = [];
    }
  }
  $connection->close();     
  return $results; 
}
?>