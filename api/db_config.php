<?php

$server = "localhost";
$username = "root";
$password = "";
$dbname = "tasys3";
try{
$db = new PDO("mysql:host=$server;dbname=$dbname",$username,$password);


}
catch(PDOexception $e){
    $e->getMessage();
}
?>

