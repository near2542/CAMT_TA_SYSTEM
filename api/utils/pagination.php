<?php 
function makePagination($result,$limit=10)
{
    return ['data' => $result,
            'items'=>['totalItems'=>count($result),'totalpages'=>count($result)/$limit]];
}

?>