<?php
require_once('./Class/JWTauth.php');
require_once('./db_config.php');
use Auth\JWTauth;
require_once('./header.php');

$jwt = 'test';

// try{
//     if(JWTauth::verify($jwt)) return;
   
// }
// catch(Exception $e)
// {
//     http_response_code(403);
//     json_encode(['auth'=>false]);
// }



if($_SERVER['REQUEST_METHOD'] === 'GET')
{
    
    try{
        $sql = "SELECT * from day_work WHERE deleted=0;";
        $row = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
    }
    catch(Exception $e)
    {
        http_response_code(400);
        echo json_encode($e->getMessage());
    }

    exit(-1);
}