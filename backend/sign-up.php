<?php
require "connection.php";
$email = $_POST["email"];
$username = $_POST["name"];
$password = $_POST["password"];
$confirm_password = $_POST["confirm_password"];
$country = $_POST["country"];
$profile_pic_location = $_FILES["profile_pic"]["tmp_name"];
$userid = generateUserId();
if ($password == $confirm_password) {

      DB::search("INSERT INTO `user` (`id`,`email`, `name`, `password`, `country_id`, `profile_url`) 
      VALUES ('$userid', '$email', '$username', '$password', '$country', 'uploads/$userid.jpg')");

      move_uploaded_file($profile_pic_location, "uploads/" . $userid . ".jpg");
      echo "User registered successfully.";
} else {
      echo "Passwords do not match.";
}


function generateUserId()
{
      $microtime = microtime(true);
      $milliseconds = (int)($microtime * 1000);
      return $milliseconds;
}
