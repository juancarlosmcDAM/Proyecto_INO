<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);

/*
  listar todos los SensorData o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET['id']))
    {
      //Mostrar un post
      $sql = $dbConn->prepare("SELECT * FROM datos where id=:id");
      $sql->bindValue(':id', $_GET['id']);
      $sql->execute();
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC)  );
      exit();
	  }
    else {
      //Mostrar lista de post
      $sql = $dbConn->prepare("SELECT fecha,temp,hora FROM `datos` WHERE fecha >= (DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) and (hora > '12:00' and hora < '12:01') /*AND (fecha = '%Y-%m-12')*/ ORDER BY fecha");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      $texto = json_encode( $sql->fetchAll()  );
      echo $texto;
      exit();
	}
}
?>