<?php

$cat_one_id=$_GET['cat_one_id'];
$cat_two_id=$_GET['cat_two_id'];
$cat_three_id=$_GET['cat_three_id'];
$pagesize=$_GET['pagesize'];


$link=mysqli_connect('localhost','root','root','bk2004');
$sql="SELECT * FROM `goods`";
if($cat_one_id != 'all') $sql.=" WHERE `cat_one_id`='$cat_one_id'";
if($cat_two_id != 'all') $sql.=" AND `cat_two_id`='$cat_two_id'";
if($cat_three_id != 'all') $sql.=" AND `cat_three_id`='$cat_three_id'";

$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res,MYSQLI_ASSOC);

$count=ceil(count($data)/$pagesize);

$arr = array(
    "message" => "信息获取成功",
    "code" => 1,
    "sql" => $sql,
    "count" => $count
);

echo json_encode($arr);




?>