<?php
require "connection.php";
$userid = $_POST['user_id'];

$table = DB::search("SELECT `friends`.`freind_id` AS `friend_id`,
 `user`.`name` AS `friendname`,`user`.`profile_url` AS `friend_pic`,`user`.`email`,
 `friend_status`.`name` AS `status`
FROM `friends`
INNER JOIN `user` ON `user`.`id`=`friends`.`freind_id`
INNER JOIN `friend_status` ON `friends`.`friend_status_id`=`friend_status`.`id`
WHERE `friends`.`user_id`='$userid' AND `friend_status`.`name`='accept' ORDER BY `user`.`name` ASC");
$friendsArray = array();

for ($i = 0; $i < $table->num_rows; $i++) {
      $row = $table->fetch_assoc();
      $friendObj = new stdClass();
      $friendObj->id = $row["friend_id"];
      $friendObj->email = $row["email"];
      $friendObj->name = $row["friendname"];
      $friendObj->profile_pic = $row["friend_pic"];
      $friendObj->status = $row["status"];
      $friendsArray[$i] = $friendObj;
}



$responseJSON = json_encode($friendsArray);
echo ($responseJSON);
