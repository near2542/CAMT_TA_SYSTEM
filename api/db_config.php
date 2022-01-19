<?php
$server = $_ENV['DB_SERVER']? $_ENV['DB_SERVER'] : "localhost";
$username = $_ENV['DB_USERNAME'] ? $_ENV['DB_USERNAME'] : "root";
$password =$_ENV['DB_PASSWORD']? $_ENV['DB_PASSWORD'] : "";
$dbname = $_ENV['DB_NAME']? $_ENV['DB_NAME'] :  "tasys";

try{
$db = new PDO("mysql:host=$server;dbname=$dbname",$username,$password);
// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

}
catch(PDOexception $e){
    echo $e->getMessage();
}
?>

