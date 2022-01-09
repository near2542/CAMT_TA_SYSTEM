<?php
$server = $SERVER['DB_SERVER']? $_SERVER['DB_SERVER'] : "localhost";
$username = $_SERVER['DB_USERNAME'] ?$_SERVER['DB_USERNAME'] : "root";
$password = $_SERVER['DB_PASSWORD']? $_SERVER['DB_PASSWORD'] : "";
$dbname = $_SERVER['DB_NAME']? $_SERVER['DB_NAME'] :  "tasys";

try{
$db = new PDO("mysql:host=$server;dbname=$dbname",$username,$password);
// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

}
catch(PDOexception $e){
    echo $e->getMessage();
}
?>

