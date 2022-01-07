<?php
header('try: hehe');

if($_SERVER['HTTP_ACCESS_TOKEN']) echo 'yes';

else 'fak u';

var_dump($_SERVER);

echo json_encode(
    ['id'=> 1,'password'=>2]
);

return;



?>