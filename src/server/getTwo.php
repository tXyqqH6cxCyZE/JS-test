<?php

$cat_one_id=$_GET['cat_one_id'];

$link=mysqli_connect('localhost','root','root','bk2004');
$sql="SELECT `cat_two_id` FROM `goods` WHERE `cat_one_id`='$cat_one_id' GROUP BY `cat_two_id`";;
// if($cat_one_id!='all') $sql.=" WHERE `cat_one_id`='$cat_one_id'";

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