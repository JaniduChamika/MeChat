<?php
require "connection.php";
$requestJSON = $_POST['reqMsgJsonobject'];
$requestMsgObject = json_decode($requestJSON);

// Access the properties of the request object
$msg = $requestMsgObject->msg;
$from_user_id = $requestMsgObject->from_user_id;
$to_user_id = $requestMsgObject->to_user_id;
$datetime = date("Y-m-d H:i:s");
$status = 3;

if (empty($msg) || empty($from_user_id) || empty($to_user_id)) {
      echo "Error: Missing required fields.";
      exit;
}
DB::iudParam("INSERT INTO `chat` (`user_from`, `user_to`, `message`, `date_time`, `status_id`,`type_id`) 
  VALUES (?, ?, ?, ?, ?, ?)", [$from_user_id, $to_user_id, $msg, $datetime, $status, '1']);
echo "Success";
