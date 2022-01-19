<?php
require_once('./header.php');
require_once('./db_config.php');
use Auth\JWTauth;
header("Content-Type: application/json;charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');

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
        $sql = "SELECT * FROM course c LEFT JOIN major m ON c.major_id = m.major_id where c.deleted = 0 order by course_id";
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

