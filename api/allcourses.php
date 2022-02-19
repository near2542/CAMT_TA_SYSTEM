<?php
require_once('./Class/JWTauth.php');
require_once('./header.php');
require_once('./db_config.php');


function checkDuplicateCourse($db, $data)
{

    try {
        $sql = "SELECT id from course WHERE course_id = :course_id AND major_id = :major_id AND deleted = 0 AND id != :id";

        $statement = $db->prepare($sql);

        $statement->execute([
            ':course_id' => $data['course_id'],
            ':major_id' => $data['major_id'],
            ':id' => $data['id']
        ]);

        $isExistedSection = count($statement->fetchAll());
        if ($isExistedSection > 0) {
            http_response_code(400);
            die(json_encode(['error' => 'Duplicate Course ID or Major']));
        }
        return;
    } catch (Exception $e) {
        print_r($statement);
        die(json_encode($e->getMessage()));
    }
}

function checkIfAssigned($id, $db)
{
    $intID = (int)$id;
    try {
        $sql = "SELECT m.m_course_id from course c
                LEFT JOIN matching_course m ON m.courseID = c.id
                WHERE m.courseID = :course_id 
                AND m.deleted = 0;";

        $statementTest = $db->prepare($sql);

        $statementTest->execute([
            ':course_id' => $intID,
        ]);

        $isAssigned = count($statementTest->fetchAll());
        if ($isAssigned > 0) {
            http_response_code(400);
            die(json_encode(['error' => 'Course is assigned, cannot be deleted or edited']));
        }
        return;
    } catch (Exception $e) {
        echo $intID;
        die($e->getMessage());
    }
}

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
    checkDuplicateCourse($db, $decode);
    try {
        $sql = "INSERT INTO course values (NULL,:course_id,:course_name,:major_id,0);";
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
    checkDuplicateCourse($db, $decode);
    checkIfAssigned($decode['id'], $db);
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
    checkIfAssigned($id, $db);
    $sql = "UPDATE course SET 
                deleted=1
                WHERE id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':id' => $id,
    ]);

    echo json_encode($result);
}
