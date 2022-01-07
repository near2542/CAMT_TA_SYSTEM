<?php
require_once('./Class/JWTauth.php');
require_once('./db_config.php');

use Auth\JWTauth;

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');

$jwt = 'test';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $condition = null;
    if (isset($_GET['user'])) $condition = "user_id= {$_GET['user']} and";
    try {
        $sql = "SELECT m.m_course_id,m.sem_id,m.courseID,c.course_id,section,m.t_date,m.user_id,LANGUAGE AS language,hr_per_week,m.m_status,m.deleted,
        t_time,DAY AS day,sem_number,year,course_name,t.approved,request_id
      FROM matching_course m
      LEFT JOIN ta_request t ON t.m_course_id = m.m_course_id
      INNER JOIN semester s on m.sem_id = s.sem_id
      INNER JOIN course c on m.courseID = c.id
      INNER JOIN day_work d on m.t_date = d.id
      WHERE $condition  m.deleted = 0 
      ORDER BY s.sem_number,m.m_status;";

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
        $sql = "INSERT INTO ta_request values ('',
                                                :m_course_id,
                                                :student_num,
                                                :external_num,
                                                :note,
                                                NULL,
                                                :user_id,
                                                '')";
                                                
        $statement = $db->prepare($sql);
        $result = $statement->execute([
            ':m_course_id' => $decode['m_course_id'],
            ':student_num' => isset($decode['student_num']) ? $decode['student_num'] : 0,
            ':external_num' => isset($decode['external_num']) ? $decode['student_num'] : 0,
            ':note' => isset($decode['note']) || '',
            ':user_id' => $decode['user_id']
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
    $sql = "UPDATE matching_course SET  sem_id = :sem_id, courseID = :course_id, section = :section, t_date = :day,
    t_time = :work_time, user_id = :user_id, language = :language, hr_per_week =  :hour, m_status = '1',deleted = '0' where m_course_id = :m_course_id ";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':sem_id' => $decode['sem_id'],
        ':course_id' => $decode['course_id'],
        ':section' => $decode['section'],
        ':day' => $decode['day'],
        ':work_time' => $decode['work_time'],
        ':user_id' => $decode['user_id'],
        ':language' => $decode['language'],
        ':hour' => $decode['hour'],
        ':m_course_id' => $decode['m_course_id']
    ]);

    echo json_encode($result);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = file_get_contents('php://input');
    $decode = json_decode($input, true);
    $sql = "UPDATE course SET 
                deleted=:deleted
                WHERE id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':deleted' => $decode['deleted'],

        ':id' => $decode['id'],
    ]);

    echo json_encode($result);
}
