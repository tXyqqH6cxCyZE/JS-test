<?php

$link=mysqli_connect('localhost','root','root','bk2004');
$sql="SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);

$arr = array(
    "message" => "信息获取成功",
    "code" => 1,
    "sql" => $sql,
    "data" => $data 
);
echo json_encode($arr);




?>