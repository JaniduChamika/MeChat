<?php
require "connection.php";
$email = $_POST["email"];
$username = $_POST["name"];
$password = $_POST["password"];
$confirm_password = $_POST["confirm_password"];
$country = $_POST["country"];
$profile_pic = $_FILES["profile_pic"] ?? null;

$userid = generateUserId();
$msg = "";
if (empty($email)) {
      $msg = "Email is required.";
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $msg = "Invalid email format.";
} else if (empty($username)) {
      $msg = "Name is required.";
} else if (strlen($username) < 3) {
      $msg = "Name must be at least 3 characters.";
} else if (empty($password)) {
      $msg = "Password is required.";
} else if (strlen($password) < 6) {
      $msg = "Password must be at least 6 characters.";
} else if ($password !== $confirm_password) {
      $msg = "Passwords do not match.";
} else if (!$profile_pic || $profile_pic['error'] === UPLOAD_ERR_NO_FILE) {
      $msg = "Profile picture is required.";
} else {
      $profile_pic_location = $_FILES["profile_pic"]["tmp_name"];
      DB::iud("INSERT INTO `user` (`id`,`email`, `name`, `password`, `country_id`, `profile_url`) 
      VALUES ('$userid', '$email', '$username', '$password', '$country', 'uploads/$userid.jpg')");

      move_uploaded_file($profile_pic_location, "uploads/" . $userid . ".jpg");
      $msg = "User registered successfully.";
}

echo $msg;
function generateUserId()
{
      $microtime = microtime(true);
      $milliseconds = (int)($microtime * 1000);
      return $milliseconds;
}
