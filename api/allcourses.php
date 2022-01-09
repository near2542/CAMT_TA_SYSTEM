<?php
require_once('./Class/JWTauth.php');
require_once('./db_config.php');

use Auth\JWTauth;

require_once('./header.php');
$jwt = 'test';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    try {
        $sql = "SELECT * FROM course c LEFT JOIN major m ON c.major_id = m.major_id where c.deleted = 0 
        ORDER BY course_id,course_name,major_name";
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

    try {
        $sql = "INSERT INTO course values ('',:course_id,:course_name,:major_id,0);";
        $statement = $db->prepare($sql);
        $result = $statement->execute([
            ':course_id' => $decode['course_id'],
            ':course_name' => $decode['course_name'],
            ':major_id' => $decode['major_id']
        ]);
        echo json_encode($result);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode($e->getMessage());
    }

    exit(-1);
} else if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = file_get_contents('php://input');
    $decode = json_decode($input, true);
    $sql = "UPDATE course SET course_id=:course_id,
             course_name=:course_name,
            major_id=:major_id
            WHERE id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':course_id' => $decode['course_id'],
        ':course_name' => $decode['course_name'],
        ':major_id' => $decode['major_id'],
        ':id' => $decode['id'],
    ]);

    echo json_encode($result);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    var_dump($input);
   echo $_SERVER['REQUEST_METHOD'];


    $sql = "UPDATE course SET 
                deleted=1
                WHERE id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':id' => $id,
    ]);

    echo json_encode($result);
}
