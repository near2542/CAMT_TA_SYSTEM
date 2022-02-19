<?php
require_once('./header.php');
require_once('./Class/JWTauth.php');
require_once('./db_config.php');

use Auth\JWTauth;

require_once('./header.php');

$jwt = 'test';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = $_GET['user'];
    try {
        $sql = "SELECT *,m.m_course_id AS matching_id,ISNULL(r.m_course_id) AS matching_course_id
        FROM ta_request t 
            LEFT JOIN matching_course m ON t.m_course_id = m.m_course_id
        LEFT JOIN course c ON c.id = m.courseID
        LEFT JOIN user_tbl u ON u.user_id = m.user_id
        LEFT JOIN major ma ON ma.major_id = c.major_id
        LEFT JOIN semester s ON m.sem_id = s.sem_id
        LEFT JOIN day_work d ON m.t_date = d.id
        LEFT JOIN register r ON r.m_course_id = m.m_course_id AND (r.user_id = '{$user}')
        WHERE approved = 1 ";
        $row = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode($e->getMessage());
    }

    exit(-1);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $decode = json_decode($input, true);
    $sql = '';
    $array = [];
    if(isset($decode['register_id'])) {    
        $sql= "UPDATE register SET r_status=0 WHERE register_id = :register_id";
        $array = array(':register_id'=>$decode['register_id']);
    }
    else{
        $sql = "INSERT INTO register values ('',:user_id,:m_course_id,NULL,0);";
        $array = array(':user_id'=>$decode['user_id'],':m_course_id' => $decode['m_course_id']);
    }
    try {
        $statement = $db->prepare($sql);
        $result = $statement->execute($array);
        echo json_encode($result);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode($e->getMessage());
    }

    exit(-1);
} else if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = file_get_contents('php://input');
    $decode = json_decode($input, true);
    try{
    $sql = "UPDATE register SET 
            r_status=3
    WHERE register_id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':id' => $decode['register_id'],
       
    ]);
    echo json_encode($result);
}
catch(Exception $e){
    http_response_code(400);
    echo json_encode($e->getMessage());
}
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $sql = "UPDATE request_ta SET 
                r_status=3
                WHERE id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':id' => $id,
    ]);

    echo json_encode($result);
}
