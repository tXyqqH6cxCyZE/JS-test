<?php

$id=$_GET['id'];

$link=mysqli_connect('localhost','root','root','bk2004');
$sql="SELECT * FROM `goods` WHERE `goods_id`='$id'";
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);

$arr = array(
    "message" => "信息获取成功",
    "id"=>$id,
    "code" => 1,
    "sql" => $sql,
    "data" => $data 
);
echo json_encode($arr);




?>