<?php 

// include('index.html');
//require('conecta.php');
//$mysqli = new mysqli();
//$mysqli->set_charset("utf8");

header('Content-Type: text/html; charset=utf-8');

$db_host = 'localhost'; 
$db_user = 'C316379_dba'; 
$db_pwd = '9zmNCHFuCu&%)1';
$database = 'C316379_feeldeagua';

$conn = mysqli_connect($db_host, $db_user, $db_pwd, $database);

if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    //you need to exit the script, if there is an error
    exit();
}

$sql = "SELECT * FROM DISCOS ORDER BY anio DESC, id";
$result = mysqli_query($conn, $sql);

echo "<head>
<style>body { background-color:#000; color:#fff; font-family:sans-serif;font-weight:bold; } 
.nombre{font-size:15px;} .banda{font-size:12px;} .anio{font-size:9px;} img{border:0}</style>
<link rel='shortcut icon' href='http://feeldeagua.net/favicon.ico' /></head>

<body><center><p><a href='http://feeldeagua.net'><img src='discogira.gif' border='none' width='200px'></a></p>";

echo "<h4>discos</h4><br><br><br><br>";

if (mysqli_num_rows($result)) {
  $counter = 0;

  echo '<div class="row">';
  while ($row = mysqli_fetch_assoc($result)) {

      if ($counter != 0 && $counter % 3 == 0) {
          echo '</div><div class="row">';
      }
      echo "<div><a href='".$row['url_descarga']."'><img height=350px width=350px src='".$row['url_tapa']."'></a><br />";
      echo "<div class='nombre'>".$row['nombre']."</div>";
      echo "<div class='banda'>".$row['artista']."</div>";
      echo "<div class='anio'>(".$row['anio'].")</div>";
      echo "</div>";

      ++$counter;
  }
  echo '</div>';
}
  
  // Free result set
mysqli_free_result($result);

mysqli_close($conn);

?>

<body>