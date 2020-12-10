<?php

$one=$_GET['cat_one_id'];
$two=$_GET['cat_two_id'];
$three=$_GET['cat_three_id'];
$method=$_GET['method'];
$type=$_GET['type'];
$number=$_GET['number'];
$pagesize=$_GET['pagesize'];
$current=$_GET['current'];


$link=mysqli_connect('localhost','root','root','bk2004');

$sql="SELECT * FROM `goods`";

if ($one != 'all') $sql.=" WHERE `cat_one_id`='$one'";
if ($two != 'all') $sql.=" AND `cat_two_id`='$two'";
if ($three != 'all') $sql.=" AND `cat_three_id`='$three'";
if ($method=="综合") $sql.=" ORDER BY `goods_id` $type";
if ($method=="商品余量") $sql.=" ORDER BY `goods_number` $type";
if ($method=="价格") $sql.=" ORDER BY `goods_price` $type";
$start=($current-1)*$pagesize;
$sql.=" LIMIT $start, $pagesize";

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