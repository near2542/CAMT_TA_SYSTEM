<?php
require_once('./Class/JWTauth.php');
require_once('./db_config.php');
use Auth\JWTauth;
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');
header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH,DELETE,OPTIONS");
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
        $sql = "SELECT *
        FROM ta_request t INNER JOIN matching_course m ON t.m_course_id = m.m_course_id
        INNER JOIN course c ON c.id = m.courseID
        INNER JOIN user_tbl u ON u.user_id = m.user_id
        INNER JOIN semester s ON m.sem_id = s.sem_id
        INNER JOIN day_work d ON m.t_date = d.id
        INNER JOIN major ma ON c.major_id = ma.major_id
        WHERE (t.approved != 2 and t.approved != 1)"
        ;
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

else if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $input = file_get_contents('php://input');
$decode = json_decode($input,true);
$ab = $ac = 1;

try{
    $sql = "INSERT INTO course values ('',:course_id,:course_name,:major_id,0);";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':course_id' => $decode['course_id'],
        ':course_name' => $decode['course_name'],
        ':major_id'=>$decode['major_id']
    ]);
    
    echo json_encode($result);

}
catch(Exception $e)
{
    http_response_code(400);
    echo json_encode($e->getMessage());
}

exit(-1);
}

else if($_SERVER['REQUEST_METHOD'] === 'PATCH')
{
    $status = 1;
    $id = $_GET['id'];
    if(isset($_GET['reject']))
    {
     $status = 2;    
    }
    $input = file_get_contents('php://input');
$decode = json_decode($input,true);
$sql = "UPDATE ta_request SET approved=:status
            WHERE request_id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':status' => $status,
        ':id'=>$id,
    ]);
    
    echo json_encode($result);

}

else if($_SERVER['REQUEST_METHOD'] === 'DELETE')
{
    $input = file_get_contents('php://input');
    $decode = json_decode($input,true);
    $sql = "UPDATE course SET 
                deleted=:deleted
                WHERE id=:id;";
        $statement = $db->prepare($sql);
        $result = $statement->execute([
            ':deleted' => $decode['deleted'],
            
            ':id'=>$decode['id'],
        ]);
        
        echo json_encode($result);
}