<?php
require_once('./Class/JWTauth.php');
require_once('./db_config.php');
use Auth\JWTauth;
header("Content-Type: application/json");
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
{ $id = null;
    if(isset($_GET['user'])) $id = "and m.user_id =  {$_GET['user']}";
     
    try{
        $sql = "SELECT *,r.user_id AS TA,m.user_id AS Teacher
        FROM register r INNER JOIN user_tbl u ON r.user_id = u.user_id
        INNER JOIN matching_course m on m.m_course_id = r.m_course_id
        INNER JOIN course c on c.id = m.courseID
        INNER JOIN semester s on m.sem_id = s.sem_id
        INNER JOIN day_work d on d.id = m.t_date
        INNER JOIN ta_request t ON t.m_course_id = m.m_course_id
        INNER JOIN user_tbl user  ON user.user_id = m.user_id
      INNER JOIN major  ON major.major_id = c.major_id 
        WHERE approved = 1 AND m_status =1  and r_status = 0 $id;";
        $row = $db->query($sql)->fetchAll();
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

try{
    $db->beginTransaction();
    $criteria = $decode['17'] == 2? '(cur_stu < stu_num)' : '(cur_ex < ex_num)';
    $sql = "SELECT  $criteria AS registerable FROM ta_request WHERE request_id = :request_id";
    $statement = $db->prepare($sql);
    $statement->execute([':request_id'=>$decode['request_id']]);
    $result = $statement->fetch();
    if($result['registerable'] == 0) throw new Exception('The slot is full');
    

    $sql = "UPDATE register SET r_status=1 where register_id=:register_id";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':register_id' => $decode['register_id']
    ]);
    $criteria = $decode['17'] == 2? 'cur_stu' : 'ex_num';
    $sql = "UPDATE ta_request SET $criteria = (SELECT $criteria from ta_request WHERE request_id = :request_id)+1 
            WHERE request_id = :request_id_2";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':request_id' => $decode['request_id'],
        ':request_id_2' => $decode['request_id'],
    ]);

    $sql = "INSERT INTO matching_ta values('',:request_id,:register_id,1)";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':request_id'=>$decode['request_id'],
        ':register_id'=>$decode['register_id']
    ]);
    $db->commit();
    echo json_encode($result);

}
catch(Exception $e)
{
    $db->rollback();
    http_response_code(400);
    echo json_encode($e->getMessage());
}
exit(-1);
}

else if($_SERVER['REQUEST_METHOD'] === 'PATCH')
{
    $input = file_get_contents('php://input');
$decode = json_decode($input,true);
try{
$sql = "UPDATE register SET r_status=2 WHERE register_id=:register_id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':register' => $decode['register_id'],
    ]);
    
    echo json_encode($result);
}
catch(Exception $e)
{
    echo json_encode($e->getMessage());
}
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