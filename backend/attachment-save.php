<?php
require "connection.php";
$requestJSON = $_POST['reqMsgJsonobject'];
$attachment = $_FILES['attachment'];
$requestMsgObject = json_decode($requestJSON);


$from_user_id = $requestMsgObject->from_user_id;
$to_user_id = $requestMsgObject->to_user_id;
$attach_type = $requestMsgObject->attach_type;
date_default_timezone_set('Asia/Colombo');
$datetime = date("Y-m-d H:i:s");
$status = 3;

if (empty($from_user_id) || empty($to_user_id)) {
      echo "Error: Missing required fields.";
      exit;
}

$attachment_name = generateId() . "_" . $attach_type;
$type = $attachment['type'];
$attachment_temp_location = $_FILES["attachment"]["tmp_name"];

$mimeToExt = [
      'image/jpeg'            => 'jpg',
      'image/png'             => 'png',
      'image/gif'             => 'gif',
      'application/pdf'       => 'pdf',
      'text/plain'            => 'txt',
      'application/msword'    => 'doc',
];
$ext = isset($mimeToExt[$type]) ? $mimeToExt[$type] : 'bin';
$typeid = 1;
if ($attach_type == "image") {
      $typeid = 2;
} else if ($attach_type == "pdf") {
      $typeid = 4;
}
$msg_url = "uploads/chat/" . $attachment_name . "." . $ext;
move_uploaded_file($attachment_temp_location, $msg_url);

DB::iudParam("INSERT INTO `chat` (`user_from`, `user_to`, `message`, `date_time`, `status_id`,`type_id`) 
  VALUES (?, ?, ?, ?, ?, ?)", [$from_user_id, $to_user_id, $msg_url, $datetime, $status, $typeid]);
echo "Success";


function generateId()
{
      $microtime = microtime(true);
      $milliseconds = (int)($microtime * 1000);
      return $milliseconds;
}
