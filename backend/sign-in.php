<?php
require "connection.php";
$email = $_POST["email"];
$password = $_POST["password"];
$phpResponseObject = new stdClass();
$phpResponseObject->msg = "";
if (empty($email)) {
      $phpResponseObject->msg = "Email is required.";
} else if (empty($password)) {
      $phpResponseObject->msg = "Password is required.";
} else {
      $table =   DB::search("SELECT * FROM `user` WHERE `email` = '" . $email . "' AND `password` = '" . $password . "'");
      if ($table->num_rows == 0) {
            $phpResponseObject->msg = "Incorrect email or password.";
      } else {
            $phpResponseObject->msg = "Success";
            $row = $table->fetch_assoc();
            $phpResponseObject->user = $row;
      }
}
$jsonResponseText = json_encode($phpResponseObject);
echo ($jsonResponseText);
