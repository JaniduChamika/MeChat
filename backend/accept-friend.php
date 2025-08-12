<?php
require "connection.php";
$requestJSON = $_POST['reqMsgJsonobject'];
$requestMsgObject = json_decode($requestJSON);


$user_id = $requestMsgObject->user_id;
$friend_id = $requestMsgObject->friend_id;
$request_id = $requestMsgObject->request_id;

$datetime = date("Y-m-d H:i:s");
$status = 3;

if (empty($friend_id) || empty($user_id) || empty($request_id)) {
      echo "Error: Missing required fields.";
      exit;
}

$result = DB::iudParam("UPDATE `friends` SET `friend_status_id` = ? WHERE `id` = ? ", ['1', $request_id]);



DB::iudParam("INSERT INTO `friends` (`user_id`, `freind_id`, `friend_status_id`) 
  VALUES (?, ?, ?)", [$user_id, $friend_id, 1]);
echo "Success";
