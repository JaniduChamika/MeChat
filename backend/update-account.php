<?php
require "connection.php";
$reqMsgJsonobject = $_POST["reqMsgJsonobject"];
$reqMsgphpobject = json_decode($reqMsgJsonobject);

$email = $reqMsgphpobject->useremail;
$username = $reqMsgphpobject->username;
$country = $reqMsgphpobject->usercountry;
$userid = $reqMsgphpobject->userId;
$phpResponseObject = new stdClass();
$phpResponseObject->msg = "";


if (empty($userid)) {
      $phpResponseObject->msg = "User ID is required.";
      echo json_encode($phpResponseObject);
      exit;
} else if (empty($email)) {
      $phpResponseObject->msg = "Email is required.";
      echo json_encode($phpResponseObject);
      exit;
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $phpResponseObject->msg = "Invalid email format.";
      echo json_encode($phpResponseObject);
      exit;
} else if (empty($username)) {
      $phpResponseObject->msg = "Name is required.";
      echo json_encode($phpResponseObject);
      exit;
} else if (strlen($username) < 3) {
      $phpResponseObject->msg = "Name must be at least 3 characters.";
      echo json_encode($phpResponseObject);
      exit;
} else {

      if (isset($_FILES["profile_pic"]) && $_FILES["profile_pic"] != null) {
            $text = str_replace(' ', '_', $username);
            $pic_extend = strtolower($text);
            $picname = generateId() . "_" . $pic_extend;
            $profile_pic = $_FILES["profile_pic"] ?? null;
            $profile_pic_location = $_FILES["profile_pic"]["tmp_name"];
            move_uploaded_file($profile_pic_location, "uploads/" . $picname . ".jpg");
            DB::iud("UPDATE `user` SET `email` = '$email', `name` = '$username', `country_id` = '$country', `profile_url` = 'uploads/$picname.jpg' WHERE `id` = '$userid'");
      } else {
            DB::iud("UPDATE `user` SET `email` = '$email', `name` = '$username', `country_id` = '$country' WHERE `id` = '$userid'");
      }

      $table =   DB::search("SELECT * FROM `user` WHERE `id` = '" . $userid . "'");
      if ($table->num_rows == 1) {
            $phpResponseObject->msg = "Success";
            $row = $table->fetch_assoc();
            $phpResponseObject->user = $row;
      } else {
            $phpResponseObject->msg = "Error.";
      }
      $jsonResponseText = json_encode($phpResponseObject);
      echo ($jsonResponseText);
}
function generateId()
{
      $microtime = microtime(true);
      $milliseconds = (int)($microtime * 1000);
      return $milliseconds;
}
