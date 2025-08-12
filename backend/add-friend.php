<?php
require "connection.php";
$requestJSON = $_POST['reqMsgJsonobject'];
$requestMsgObject = json_decode($requestJSON);


$user_id = $requestMsgObject->user_id;
$friend_email = $requestMsgObject->friend_email;
$datetime = date("Y-m-d H:i:s");
$status = 3;

if (empty($friend_email) || empty($user_id)) {
      echo "Error: Missing required fields.";
      exit;
}

$result = DB::search("SELECT * FROM user WHERE email = '$friend_email'");

if ($result->num_rows == 0) {
      echo "Friend email not found.";
      exit;
}
$friend = $result->fetch_assoc();
$friend_id = $friend['id'];
$result2 = DB::search("SELECT * FROM friends WHERE freind_id = '$friend_id' AND user_id = '$user_id'");

if ($result2->num_rows == 1) {
      echo "Friend already added.";
      exit;
}
$result3 = DB::search("SELECT * FROM friends WHERE user_id = '$friend_id' AND freind_id = '$user_id'");

if ($result3->num_rows == 1) {
      echo "You already have friend request from this user.";
      exit;
}

DB::iudParam("INSERT INTO `friends` (`user_id`, `freind_id`, `friend_status_id`) 
  VALUES (?, ?, ?)", [$user_id, $friend_id, 2]);
echo "Success";
